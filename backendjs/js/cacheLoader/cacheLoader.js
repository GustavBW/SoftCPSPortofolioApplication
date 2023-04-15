const config = require('../../env.json').riotConfig;



const doLoadCycle = () => {
    // Get the current rotation
    // Get the current champions
};

/**
 * Begins the cache loader
 * @returns NodeJS.Timer
 */
const startCacheLoader = () => {
    return setInterval(() => {
        console.log('Hello World!');
        doLoadCycle();
    }, 1000)
};


module.exports = startCacheLoader;