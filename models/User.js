'use strict';
const {default: Sequelize} = require("sequelize");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id: {
      type: Sequelize.DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    uuid: Sequelize.DataTypes.STRING,
    name: Sequelize.DataTypes.STRING,
    email: {
      type: Sequelize.DataTypes.STRING,
      length: 255
    },
    avatar: Sequelize.DataTypes.STRING,
    email_verified_at: Sequelize.DataTypes.DATE,
    phone: Sequelize.DataTypes.STRING,
    phone_verified_at: Sequelize.DataTypes.DATE,
    preferred_date_type: {
      type: Sequelize.DataTypes.ENUM,
      values: ['gregorian', 'hijri']
    },
    status: {
      type: Sequelize.DataTypes.ENUM,
      values: ['super_admin', 'active', 'banned', 'pending']
    },
    password: Sequelize.DataTypes.STRING,
    remember_token: Sequelize.DataTypes.STRING,
    created_at: {
      type: Sequelize.DataTypes.DATE,
      field: "created_at"
    },
    updated_at: {
      type: Sequelize.DataTypes.DATE,
      field: "updated_at"
    },
    deleted_at: {
      type: Sequelize.DataTypes.DATE,
      field: "deleted_at"
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: "users",
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
  return User;
};