import fetch from 'node-fetch';
import db from '../db/db.mjs';
import config from '../../../env.json' assert { type: "json" };
import { updateHighestRankedPlayers } from './playerLoader.mjs';

/**
 * Updates the cache with the current champion rotation, champion information, and highest ranked players.
 */
const doLoadCycle = async () => {
    //Reload these on every load cycle. This way you can change the env and change the api key without having to restart the server
    const appConfig = config.appConfig;
    const riotConfig = config.riotConfig;

    const timeA = new Date().getTime();

    // Get the current rotation
    const rotationPromise = await fetch(riotConfig.routeForChampionRotations.url, {
        headers: riotConfig.authHeader, //originally there where an automatic check with the env.json wether or not to use the authHeader, 
        mode: 'no-cors'                 //but somehow it would always evaluate to true, i.e. do not include the auth, even though js correctly detected that the field route...xxx.public was false
    }).then((res) => 
        db.loadRotation(res.json())
    ).catch((err) => {
        console.log('Error loading champion rotation');
        console.log(err);
    });

    //get base champion information
    const championsPromise = await fetch(riotConfig.routeForChampions.url, {
        mode: 'no-cors',
        headers: riotConfig.routeForChampionDetails.public ? {} : riotConfig.authHeader
    }).then((res) => {
        res.json().then((json) => {
            Object.values(json.data).map((champion) => {
                db.loadChampion(champion);
            })
        });
    }).catch((err) => {
        console.log('Error loading champions');
        console.log(err);
    });
    //get extended champion information
    
    const championsDetailsPromise = await fetch(riotConfig.routeForChampionDetails.url, {
        mode: 'no-cors',
        headers: riotConfig.routeForChampionDetails.public ? {} : riotConfig.authHeader
    }).then((res) => {
        res.json().then((json) => {
            Object.values(json).map((champion) => {
                db.loadChampionDetails(champion);
            })
        });
    }).catch((err) => {
        console.log('Error loading champion details');
        console.log(err);
    });

    // const rankedPromise = await updateHighestRankedPlayers();

    await Promise.all([rotationPromise, championsPromise, championsDetailsPromise])
    .then(() => {
        const deltaT = new Date().getTime() - timeA;
        console.log(`Cache loader total fetch time: ${new Date().getTime() - timeA}ms`);
        console.log(`Next update in: ${appConfig.recacheRateMinutes} minutes`);
        db.addFetchTime(deltaT);
    });
};

/**
 * Begins the cache loader
 * @returns NodeJS.Timeout
 */
const runCacheLoader = () => {
    console.log(`Cache loader started with a ${config.appConfig.recacheRateMinutes} minute recache rate`);
    doLoadCycle();
    return setTimeout(() => {
        runCacheLoader();
        //The request rate limit for this API key is 20r/s for all current routes. Each load cycle makes in total about :
        // 2 requests for champions - one for the overivew, one for the details
        // 1 request for the champion rotation
        // 1 request for the highest ranked players, however about 50 followup requests for their account details - but these are handled and spaced out by the playerLoader.
        // With each playerLoader cycle taking around 50 seconds total, and the cache loader taking 400ms, we can assume that 1 additional request is made during the cacheLoader by the playerLoader.
        // So in total, we make about 5 requests per load cycle. This means we can make 20/5 = 4 load cycles per second in theory
        // but that kinda ruins the idea with having a cache in the first place. Also it'd leave no room for environmental factors.
    }, config.appConfig.recacheRateMinutes * 60 * 1000) ;
};

const startCacheLoader = () => {
    return runCacheLoader();
};
export default startCacheLoader;