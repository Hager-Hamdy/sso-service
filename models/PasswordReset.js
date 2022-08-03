'use strict';
const {default: Sequelize} = require("sequelize");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PasswordReset extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PasswordReset.init({
    email: {
      type: Sequelize.DataTypes.STRING,
      length: 255
    },
    token: {
      type: Sequelize.DataTypes.STRING,
      length: 255
    },
    created_at: {
      type: Sequelize.DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'PasswordReset',
    tableName: "password_resets",
    createdAt: "created_at",
    updatedAt: false
  });
  PasswordReset.removeAttribute('id');
  return PasswordReset;
};