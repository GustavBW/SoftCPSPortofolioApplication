const config = require('../env.json').dbConfig;
const mysql = require('mysql');
const { create, insertChampion, insertRotation } = require('./dbCreator');

const connection = mysql.createConnection(config);
connection.connect((error) => {
    if (error) {
        console.error('Error connecting to MySQL:', error);
        return;
    }
    console.log('Connected to MySQL as ID:', connection.threadId);
    create(connection);
    connection.query('SHOW TABLES', (err, results) => {
        if (err) {
            console.log('Error getting table names');
            console.log(err);
            throw err;
        }

        console.log('Tables in database:');
        results.forEach((result) => {
            console.log(result);
        });
    });
})

const client = {
    getSession: async () => await session,
    /**
     * Inserts a single champion json object into the correct columns in the db
     * @param {champion json} data 
     */
    loadChampion: async (data) => {
        await insertChampion(connection, data);
    },
    loadRotation: async (data) => {
        await insertRotation(connection, data);
    },
    getAllChampions: async () => {
        try {
            const champions = connection.query('SELECT * FROM champions');
            return champions;
        } catch (err) {
            console.log('Error getting all champions');
            console.log(err);
            throw err;
        }
    },
    getChampion: async (id) => {
        
    }
}
module.exports = client;