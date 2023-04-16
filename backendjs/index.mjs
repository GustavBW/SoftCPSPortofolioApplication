import express from 'express';
import startCacheLoader from './js/cacheLoader/cacheLoader.mjs';
import config from './env.json' assert { type: "json" };
import db from './js/db.mjs';
import { appendHeaders } from './js/apiUtil.mjs';
import cors from 'cors';

const apiRoot = config.appConfig.apiRoot;

const server = express();
server.use(cors());

server.listen(config.appConfig.port, () => {
    console.log(`SLS Backend Service listening at http://localhost:${config.appConfig.port}`)
})

/**
 * Returns all champions if ?keys is not specified
 */
server.get(apiRoot + '/champions', async (req, res) => {
    const keys = req.query.keys;
    let keyValues;
    if (keys) {
        keyValues = keys.split(',');
    }
    const champions = await db.getAllChampions(keyValues);
    res.send(champions);
});

server.get(apiRoot + '/champions/:id', async (req, res) => {
    const champion = await db.getChampion(req.params.id);
    res.send(champion);
});

server.get(apiRoot + '/champions/:id/stats', async (req, res) => {
    const stats = await db.getStats(req.params.id);
    res.send(stats);
});

server.get(apiRoot + '/rotation', async (req, res) => {
    const rotation = await db.getNewestRotation();
    res.send(rotation);
});

startCacheLoader();