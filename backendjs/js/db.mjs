import mysql from 'mysql';
import { create, insertOrUpdateChampion, insertRotation, useDB, getChampionByKey, getStatsForChampion, getMaxOfN } from './dbUtil.mjs';
import config from '../env.json' assert { type: "json" };

const dbConfig = config.dbConfig;

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
     * Inserts a single champion json object into the correct columns in the db
     * @param {champion json} data 
     */
    loadChampion: async (data) => {
        await insertOrUpdateChampion(connection, await data);
    },
    /**
     * Inserts a single rotation json object into the correct columns in the db
     * @param {rotation json} data
     */
    loadRotation: async (data) => {
        await insertRotation(connection, await data);
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
     * @param {int} id - the champion_key of the champion to get stats for
     * @returns the statblock for said champion
     */
    getStats: async (id) => {
        const result = new Promise((resolve, reject) => {
            getStatsForChampion(connection, id, (err, results) => {
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