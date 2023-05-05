import express from 'express';
import startCacheLoader from './src/services/cacheLoader/cacheLoader.mjs';
import { initializeApi } from './src/js/api.js';
import { initializeDB } from './src/services/db/db.mjs';

//Creates an Express instance.
const server = express();

//Initializes the db and its connection.
await initializeDB();

//Parses the express instance to the module having the api route declarations.
initializeApi(server);

//Starts the cache loader.
startCacheLoader();