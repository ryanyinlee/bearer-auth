'use strict';
require('dotenv').config();

const {start} = require('./src/server.js'); // start server
const {db} = require('./src/models'); // get db
const server = require('./src/server.js'); // get server running
//const POSTGRES_URI = process.env.DATABASE_URL;

//server.start(process.env.PORT || 3000);

const port = process.env.port || 3000;

db.sync()
    .then(()=> start(port))
    .catch(error=> console.log("ERROR: " + error));

    /*

    index.js is the entry point
- connect to the database TODO
- require the server and start it TODO

    */