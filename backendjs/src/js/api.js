import config from './env.json' assert { type: "json" };
import db from './src/services/db/db.mjs';
import cors from 'cors';

const apiRoot = config.appConfig.apiRoot;


export const initializeApi = (server) => {
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

    server.get(apiRoot + '/champions/:key', async (req, res) => {
        const champion = await db.getChampion(req.params.key);
        res.send(champion);
    });

    server.get(apiRoot + '/champions/:key/stats', async (req, res) => {
        const stats = await db.getChampionStats(req.params.key);
        res.send(stats);
    });

    server.get(apiRoot + '/champions/:key/abilities', async (req, res) => {
        const abilities = await db.getChampionAbilities(req.params.key);
        res.send(abilities);
    });

    server.get(apiRoot + '/champions/:key/skins', async (req, res) => {
        const skins = await db.getChampionSkins(req.params.key);
        res.send(skins);
    });

    server.get(apiRoot + '/rotation', async (req, res) => {
        const rotation = await db.getNewestRotation();
        res.send(rotation);
    });

    server.get(apiRoot + '/rotation/:id', async (req, res) => {
        const rotation = await db.getRotation(req.params.id);
        res.send(rotation);
    });

    server.get(apiRoot + '/cache/fetchtimes', async (req, res) => {
        const amount = req.query.amount;
        const fetchTimes = await db.getFetchTimes(amount);
        res.send(fetchTimes);
    });

    server.get(apiRoot + '/summoners', async (req, res) => {
        const summoners = await db.getAllSummoners();
        res.send(summoners);
    });
}