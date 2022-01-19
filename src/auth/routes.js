'use strict';

const express = require('express');
const app = express(); // added 
app.use(express.json()); // added
const authRouter = express.Router(); 

const { userModel } = require('./models/index.js'); // from users to userModel also changed require to just the folder: Removed 
const basicAuth = require('./middleware/basic.js')
const bearerAuth = require('./middleware/bearer.js')

authRouter.post('/signup', async (req, res, next) => {
  try {
    let userRecord = await userModel.create(req.body);  // from users to Users 
    const output = {
      user: userRecord, // user from users
      token: userRecord.token
    };
    res.status(201).json(output); // changed 200 to 201
  } catch (e) {
    console.log("In routes.js, /signup route error: " + e);
    next(e.message);
  }
});

authRouter.post('/signin', basicAuth, async (req, res, next) => { // added async before req,res
  const user = {
    user: req.user,
    token: req.user.token
  };
  res.status(200).json(user); // 
});

authRouter.get('/users', bearerAuth, async (req, res, next) => {
  const users = await userModel.findAll({});
  const list = users.map(user => user.username);
  res.status(200).json(list);
});

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send("Welcome to the secret area!")
});


module.exports = authRouter;