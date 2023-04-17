import fetch from 'node-fetch';
import db from '../db.mjs';
import config from '../../env.json' assert { type: "json" };
const appConfig = config.appConfig;
const riotConfig = config.riotConfig;


const doLoadCycle = async () => {
    const timeA = new Date().getTime();
    // Get the current rotation
    // Get the current champions
    const rotationPromise = await fetch(riotConfig.routeForChampionRotations.url, {
        headers: riotConfig.authHeader,
        mode: 'no-cors'
    }).then((res) => 
        db.loadRotation(res.json())
    ).catch((err) => {
        console.log('Error loading champion rotation');
        console.log(err);
    });

    const championsPromise = await fetch(riotConfig.routeForChampions.url, {
        mode: 'no-cors'
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

    await Promise.all([rotationPromise, championsPromise])
    .then(() => {
        console.log(`Cache loader total fetch time: ${new Date().getTime() - timeA}ms`);
        console.log(`Next update in: ${appConfig.recacheRateMinutes} minutes`);
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