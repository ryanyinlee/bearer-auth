'use strict';

// Create a Sequelize model

const sequelize = require("sequelize");

const userSchema = (sequelize, DataTypes) => sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  module.exports = userSchema;