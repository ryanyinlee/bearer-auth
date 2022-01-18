'use strict';

const bcrypt = require('bcrypt');
const { userModel } = require('../models/index.js')
//const express = require('express');
// const app = express();
// app.use(express.json());

async function signup (request, response) {   
    try {

        let { username, password } = request.body;
        console.log("signup route hit");
        console.log("username: " + username);
        request.body.password = await bcrypt.hash(request.body.password, 10);
        const record = await userModel.create(request.body);
        response.status(200).json(record); // shouldn't be sent back to client, but leave for testing
        
      } catch (error) { 
          console.log(error);
          response.status(403).send("Error Creating User"); }


}

module.exports = signup;

