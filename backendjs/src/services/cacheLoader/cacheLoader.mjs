import fetch from 'node-fetch';
import db from '../db/db.mjs';
import config from '../../../env.json' assert { type: "json" };
import { updateHighestRankedPlayers } from './playerLoader.mjs';
const appConfig = config.appConfig;
const riotConfig = config.riotConfig;

/**
 * Updates the cache with the current champion rotation, champion information, and highest ranked players.
 */
const doLoadCycle = async () => {
    const timeA = new Date().getTime();

    // Get the current rotation
    const rotationPromise = await fetch(riotConfig.routeForChampionRotations.url, {
        headers: riotConfig.authHeader, //originally there where an automatic check with the env.json wether or not to use the authHeader, 
        mode: 'no-cors'                 //but somehow it would always evaluate to true, i.e. do not include the auth, even though js correctly detected that the route...xxx.public was false
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
    /**
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
    */

    const rankedPromise = await updateHighestRankedPlayers();

    await Promise.all([rotationPromise, championsPromise, rankedPromise
    //     , championsDetailsPromise
    ])
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
    console.log(`Cache loader started with a ${appConfig.recacheRateMinutes} minute recache rate`);
    doLoadCycle();
    return setTimeout(() => {
        runCacheLoader();
    }, appConfig.recacheRateMinutes * 60 * 1000) ;
};

const startCacheLoader = () => {
    return runCacheLoader();
};
export default startCacheLoader;