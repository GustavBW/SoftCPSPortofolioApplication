import express from 'express';
import startCacheLoader from './src/services/cacheLoader/cacheLoader.mjs';
import { initializeApi } from './src/js/api.js';

const server = express();

initializeApi(server);

startCacheLoader();