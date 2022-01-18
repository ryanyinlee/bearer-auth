"use strict";

require('dotenv').config();

const { Sequelize, DataTypes } = require("sequelize");

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory';

const userSchema = require("./user.js");

let db = new Sequelize(DATABASE_URL, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

const userModel = userSchema(db, DataTypes);

module.exports = {
    db,
    userModel,
};
