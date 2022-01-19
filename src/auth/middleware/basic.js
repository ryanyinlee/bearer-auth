'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.js') // user to users

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) {res.status(403).send('Invalid Login'); } // what the heck is: return _authError();
  try {
//   let basic = req.headers.authorization; // old code
  let basicHeaderParts = req.headers.authorization.split(' '); 
  let encodedString = basicHeaderParts.pop();  // added code
  let decodedString = base64.decode(encodedString); // added code
  let [username, password] = decodedString.split(':'); // added code
//   let [username, pass] = base64.decode(basic).split(':'); // old code

  
    req.user = await users.authenticateBasic(username, password) // user to users

    console.log("in basic.js req.user is: " + req.user)
    next();
  } catch (e) {
    res.status(403).send('Invalid Login');
  }

}
