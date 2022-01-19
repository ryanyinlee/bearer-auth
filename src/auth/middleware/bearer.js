'use strict';

const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {

  try { // moved up
 
    if (!req.headers.authorization) { next('Invalid Login'); }
    // var token = req.headers.authorization.split(' ')[1];
    const token = req.headers.authorization.split(' ').pop(); 
    // https://stackoverflow.com/questions/51849010/json-web-token-verify-return-jwt-malformed
    const validUser = await users.authenticateToken(token); // changed await users.authenticateWithToken(token); to await users.authenticateToken(token); 

    req.user = validUser;
    req.token = validUser.token;

    res.status(200).send(req.token); // added
    // next();
  } catch (e) {
    console.log("Bearer.js error: " + e);
    res.status(403).send('Invalid Login');
    
  }
};