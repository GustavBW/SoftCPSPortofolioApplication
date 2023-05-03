//Utility functions like create and useDB for the main db module.

import config from '../../../env.json' assert { type: "json" };
import { createSkinsTableQuery } from './repositories/ChampSkinsRepository.mjs';
import { createChampionsTableQuery } from './repositories/ChampionRepository.mjs';
import { createChampionStatsTableQuery, createChampionImageDataQuery } from './repositories/StatsAndImageData.mjs';
import { createRotationsTableQuery } from './repositories/RotationsRepository.mjs';
import { createFetchTimesTableQuery } from './repositories/BackendStatsRepository.mjs';
import { createAbilitiesTableQuery } from './repositories/ChampionAbilitiesRepository.mjs';
import { createSummonerTableQuery } from './repositories/SummonerRepository.mjs';
const dbConfig = config.dbConfig;


const getMaxOfNQuery = (table, column) => {
    return `SELECT * FROM ${table} WHERE ${column} = (SELECT MAX(${column}) FROM ${table})`;
}

/**
 * Drops db, then recreates to wipe all data. Then creates all tables
 * @param {db connection} connection 
 */
export const create = async (connection) => {
    try {
        console.log('Dropping db if exists...');
        await connection.query("DROP DATABASE IF EXISTS " + dbConfig.database + ";");
        await connection.query("CREATE DATABASE " + dbConfig.database + ";");
        await connection.query("USE " + dbConfig.database + ";");

        console.log('Creating tables...');
        await connection.query(createChampionsTableQuery);
        await connection.query(createRotationsTableQuery);
        await connection.query(createChampionImageDataQuery);
        await connection.query(createChampionStatsTableQuery);
        await connection.query(createSkinsTableQuery);
        await connection.query(createFetchTimesTableQuery);
        await connection.query(createAbilitiesTableQuery);
        await connection.query(createSummonerTableQuery);
    } catch (err) {
        console.log('Error creating tables');
        console.log(err);
        throw err;
    }
}

/**
 * Selects the database to use
 * @param {db connection} connection 
 */
export const useDB = async (connection) => {
    try {
        await connection.query("USE " + dbConfig.database + ";");
    } catch (err) {
        console.log('Error using database');
        console.log(err);
        throw err;
    }
}

/**
 * Retrives the row which has the highest value for the given column in a given table
 * @param {string} table - table name
 * @param {string} column - column name
 */
export const getMaxOfN = async (connection, table, column, callback) => {
    connection.query(getMaxOfNQuery(table, column), (err, result) => callback(err,result));
}





