const express = require('express');
const env = require('./env.json');
const app = express();
const client = require('./js/db');
const startCacheLoader = require('./js/cacheLoader/cacheLoader');

startCacheLoader();

app.get('/', (req, res) => {
    res.send('Hello World!')
    }
)

app.listen(env.appConfig.port, () => {
    console.log(`Example app listening at http://localhost:${env.appConfig.port}`)
})
