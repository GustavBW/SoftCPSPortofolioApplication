const express = require('express');
const env = require('./env.json');
const app = express();
const db = require('./js/db');

app.get('/', (req, res) => {
    res.send('Hello World!')
    }
)

app.listen(env.appConfig.port, () => {
    console.log(`Example app listening at http://localhost:${env.appConfig.port}`)
})
