'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // call in JWT
const APP_SECRET = process.env.APP_SECRET || 'secretstringfortesting'; // call in APP_SECRET

const userSchema = (sequelize, DataTypes) => {
  const model = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false, },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, APP_SECRET); // added APP_SECRET
      },
    },
  });

  model.beforeCreate(async (user) => {
    // let hashedPass = await bcrypt.hash(user.password, 10); // added await before bcrypt
    // user.password = hashedPass;

    user.password = await bcrypt.hash(user.password, 10); // replaced above
  });

  // Basic AUTH: Validating strings (username, password) 
  model.authenticateBasic = async function (username, password) {
    const user = await this.findOne({ where: { username }}); // changed username  searchfrom to ({ username }) ({ where: { username }});
    const valid = await bcrypt.compare(password, user.password)
    if (valid) { return user; }
    else {  // added else
        throw new Error('Invalid User');
    };    
  }

  // Bearer AUTH: Validating a token
  model.authenticateToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, APP_SECRET); // changed from process.env.SECRET to APP_SECRET
      const user = await this.findOne({where: { username: parsedToken.username }}); // added await - also changed ({ username: parsedToken.username }) to ({where: { username: parsedToken.username }});
      if (user) { return user; }
      else { // added else
        throw new Error("User Not Found");
      }
      
    } catch (e) {
        console.log("BearerAuth in users.js has this error: " + e);
      throw new Error(e.message)
    }
  }

  return model;
}

module.exports = userSchema;