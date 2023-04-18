import mysql from 'mysql';
import { create, useDB, getMaxOfN } from './dbUtil.mjs';
import { insertOrUpdateChampion, getChampionByKey } from './ChampionRepository.mjs';
import { insertOrUpdateRotation } from './RotationsRepository.mjs';
import {getAbilityByChampionAndName} from './ChampionAbilitiesRepository.mjs';
import { insertOrUpdateSkin } from './ChampSkinsRepository.mjs';
import { insertOrUpdateAbility } from './ChampionAbilitiesRepository.mjs';
import config from '../../../env.json' assert { type: "json" };
import { insertFetchTimeNow } from './BackendStatsRepository.mjs';

const dbConfig = config.dbConfig;

//Defaulting to no database as it is taken down and reestablished as the first step of create()
const connection = mysql.createConnection({...dbConfig, database: ""});
connection.connect((error) => {
    if (error) {
        console.error('Error connecting to MySQL:', error);
        return;
    }
    console.log('Connected to MySQL as ID:', connection.threadId);
    create(connection).then(()=> {
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
            insertOrUpdateAbility(connection, ability, expandedChampion.name);
        });
        Object.values(await expandedChampion.skins).forEach((skin) => {
            insertOrUpdateSkin(connection, skin, expandedChampion.name);
        });
    },
    /**
     * Inserts a single rotation json object into the correct columns in the db
     * @param {rotation json} data
     */
    loadRotation: async (data) => {
        await insertOrUpdateRotation(connection, await data);
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
            getStatsForChampion(connection, key, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        return result;
    },
    getChampionAbilities: async (key) => {
        const result = new Promise((resolve, reject) => {
            connection.query('SELECT * FROM abilities WHERE champion_key = ?', [key], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        return result;
    },
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
    getNewestRotation: async () => {
        const result = new Promise((resolve, reject) => {
            getMaxOfN(connection, 'rotations', 'id', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        return result;
    },
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