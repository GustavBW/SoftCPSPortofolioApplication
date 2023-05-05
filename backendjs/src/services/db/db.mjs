//Takes care of the db connection and the different repositories.

import mysql from 'mysql';
import { create, useDB, getMaxOfN } from './dbUtil.mjs';
import { insertOrUpdateChampion, getChampionByKey } from './repositories/ChampionRepository.mjs';
import { getRotationForToday, insertOrUpdateRotation } from './repositories/RotationsRepository.mjs';
import { getAbilityByChampionAndName } from './repositories/ChampionAbilitiesRepository.mjs';
import { insertOrUpdateSkin } from './repositories/ChampSkinsRepository.mjs';
import { insertOrUpdateAbility } from './repositories/ChampionAbilitiesRepository.mjs';
import { insertOrUpdateSummoner } from './repositories/SummonerRepository.mjs';
import config from '../../../env.json' assert { type: "json" };
import { insertFetchTimeNow } from './repositories/BackendStatsRepository.mjs';

const dbConfig = config.dbConfig;

let connection = null;

export const initializeDB = async () => {
    //Defaulting to no database as it is taken down and reestablished as the first step of create()
    connection = mysql.createConnection({...dbConfig, database: ""});
    connection.connect((error) => {
        if (error) {
            console.error('Error connecting to MySQL:', error);
            return;
        }
        console.log('Connected to MySQL as ID:', connection.threadId);
        create(connection).then( async ()=> {
            //selecting the db again as the create function sometimes doesnt reselect the sls db correctly
            useDB(connection).then(() => {
                connection.query('SHOW TABLES', (err, results) => {
                    if (err) {
                        console.log('Error getting table names');
                        console.log(err);
                        throw err;
                    }

                    console.log('Tables in database:');
                    results.forEach((result) => {
                        console.log("\t"+result['Tables_in_' + dbConfig.database]);
                    });
                });
            });
            
        });
    })
}

/**
 * Unified access to the database
 */
const db = {

    /**
     * Gathers the last "amount" amount of fetch times from the db
     * @param {int} amount 
     * @returns 
     */
    getFetchTimes: async (amount) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM fetch_times', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    if(amount){
                        resolve(results.slice(-amount));
                    }
                    resolve(results);
                }
            });
        });
    },
    /**
     * Adds a fetch time along side timestamp to the db
     * @param {ms} fetchTimeMS 
     * @returns 
     */
    addFetchTime: async (fetchTimeMS) => {
        await insertFetchTimeNow(await connection, fetchTimeMS);
    },
    /**
     * Inserts a single champion json object into the correct columns in the db
     * @param {champion json} data 
     */
    loadChampion: async (data) => {
        await insertOrUpdateChampion(connection, await data);
    },
    /**
     * Loads the details, i.e. abilities and skins, for a single champion into the db
     * @param {expanded champion json} data for a champion
     */
    loadChampionDetails: async (expandedChampion) => {
        Object.values(await expandedChampion.abilities).forEach((ability) => {
            insertOrUpdateAbility(connection, ability[0], expandedChampion.id);
        });
        /* // This one exists and is supported, but is not used by the frontend so it has been disabled.
        Object.values(await expandedChampion.skins).forEach((skin) => {
            insertOrUpdateSkin(connection, skin, expandedChampion.name);
        });
        */
    },
    /**
     * Inserts or updates a single rotation json object into the correct columns in the db
     * @param {rotation json} data
     */
    loadRotation: async (data) => {
        await insertOrUpdateRotation(connection, await data);
    },
    /**
     * Inserts or updates a single summoner json object into the correct columns in the db
     */
    loadSummoner: async (data) => {
        // await insertOrUpdateSummoner(connection, await data);
    },
    /**
     * Does not, in fact, give all 1.8 million player accounts - but merily the first 50 challengers.
     */
    getAllSummoners: async () => {
        const result = new Promise((resolve, reject) => {
            connection.query('SELECT * FROM summoners', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        return result;
    },
    /**
     * @param {int[]} keyValues - the champion_keys of the champions to get
     * @returns all champions in the db
     */
    getAllChampions: async (keyValues) => {
        const results = await new Promise((resolve, reject) => {
            if(keyValues && keyValues.length > 0) {
                connection.query('SELECT * FROM champions WHERE champion_key IN (?)', [keyValues], (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
            } else {
                connection.query('SELECT * FROM champions', (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
            }
        });
        return results;
    },
    /**
     * @param {int} id - the champion_key of the champion to get
     * @returns the champion with the given key
     */
    getChampion: async (id) => {
        const result = new Promise((resolve, reject) => {
            getChampionByKey(connection, id, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        return result;
    },
    /**
     * @param {int} key - the champion_key of the champion to get stats for
     * @returns the statblock for said champion
     */
    getChampionStats: async (key) => {
        const result = new Promise((resolve, reject) => {
            connection.query("SELECT * FROM champion_stats WHERE champion_key = ?", [key], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        return result;
    },
    /**
     * @param {int} key - the champion_key of the champion to get abilities for
     * @returns the abilities for said champion
     */
    getChampionAbilities: async (key) => {
        const result = new Promise((resolve, reject) => {
            connection.query('SELECT * FROM champion_abilities WHERE champion_key = ?', [key], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        return result;
    },
    /**
     * Retrieves all skins for a given champion by key
     * @param {int} key 
     */
    getChampionSkins: async (key) => {
        const result = new Promise((resolve, reject) => {
            connection.query('SELECT * FROM champion_skins WHERE champion_key = ?', [key], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        return result;
    },
    /**
     * @param {int} key - the champion_key of the champion to get the specified ability for
     * @param {string} name - the name of the ability to get
     * @returns any data concerning said ability
     */
    getAbilityByKeyAndName: async (key, name) => {
        const result = new Promise((resolve, reject) => {
            getAbilityByChampionAndName(connection, key, name, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        return result;
    },
    /**
     * Retrieves the current champion rotation
     * @returns the current champion rotation
     */
    getNewestRotation: async () => {
        const result = new Promise((resolve, reject) => {
            getRotationForToday(connection, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        return result;
    },
    /**
     * Retrieves the newest champion
     */
    getNewestChampion: async () => {
        const result = new Promise((resolve, reject) => {
            getMaxOfN(connection, 'champions', 'champion_key', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        return result;
    }
}
export default db;