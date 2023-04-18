import config from '../../../env.json' assert { type: "json" };
import { createSkinsTableQuery } from './ChampSkinsRepository.mjs';
import { createChampionsTableQuery } from './ChampionRepository.mjs';
import { createChampionStatsTableQuery, createChampionImageDataQuery } from './StatsAndImageData.mjs';
import { createRotationsTableQuery } from './RotationsRepository.mjs';
import { createFetchTimesTableQuery } from './BackendStatsRepository.mjs';
import { createAbilitiesTableQuery } from './ChampionAbilitiesRepository.mjs';
const dbConfig = config.dbConfig;
const riotConfig = config.riotConfig;

const getMaxOfNQuery = (table, column) => {
    return `SELECT * FROM ${table} WHERE ${column} = (SELECT MAX(${column}) FROM ${table})`;
}

/**
 * Drops db, then recreates to wipe all data. Then creates tables
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
    } catch (err) {
        console.log('Error creating tables');
        console.log(err);
        throw err;
    }
}

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





