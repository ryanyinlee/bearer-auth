'use strict';

// 3rd Party Resources
const express = require('express');
const dotenv = require('dotenv');

const { Sequelize, DataTypes } = require('sequelize');

const notFound = require('./error-handlers/404.js');
const serverError = require('./error-handlers/500.js');

// Prepare the express app
const app = express();

// Process JSON input and put the data on req.body
app.use(express.json());

// Routes and start the router.
const userRoutes = require('./routes/user.js');
app.use(userRoutes);

//const sequelize = new Sequelize(process.env.DATABASE_URL);


// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));

// make sure our tables are created, start up the HTTP server.
// sequelize.sync()
//   .then(() => {
//     app.listen(port, () => console.log('Server is running.'));
//   }).catch(e => {
//     console.error('Could not start server', e.message);
//   });

app.use(notFound);

// Make sure error handlers are below any middleware that would trigger next();
app.use(serverError);


module.exports = {
  start: (port) => {
      app.listen(port, () => {
          console.log('Server is listening on port: ' + port);
      });        
  }, app,
};