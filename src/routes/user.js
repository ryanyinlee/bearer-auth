'use strict';

const express = require('express');
const app = express();
const {userModel}= require('../models');
const bcrypt = require('bcrypt');
const router = express.Router(); // object defines routing logic

app.use(express.json());
// hook up signup and signin
const signup = require('../auth/signup.js');
const signin = require('../auth/signin.js');

// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup usernmae=john password=foo
router.post('/signup', async (request, response) => {
    await signup(request, response);
  });
  
  
  // Signin Route -- login with username and password
  // test with httpie
  // http post :3000/signin -a john:foo
  router.post('/signin', async (request, response) => {
  
    await signin(request, response);
  });

 
//   router.use((req, res) => {
//     res.status(200).send(req.body.user);
//   });

  module.exports = router;