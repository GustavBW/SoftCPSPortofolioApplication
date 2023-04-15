const { MongoClient } = require('mongodb');
const env = require('../env.json');
console.log(env);

const mysqlx = require('@mysql/xdevapi');
const session = mysqlx.getSession({
    host: 'localhost',
    port: 33060,
    user: 'root',
    password: 'password'
})
.then(session => {
    console.log('Connection successful');
    // Do something with the session
    session.close();
})
.catch(err => {
    console.log('Failed to connect');
    console.log(err);
});

module.exports = session;