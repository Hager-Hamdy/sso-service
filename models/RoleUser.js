'use strict';
const {default: Sequelize} = require("sequelize");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoleUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RoleUser.User = models["RoleUser"].belongsTo(models["User"], {
        foreignKey: "user_id"
      })
      RoleUser.Role = models["RoleUser"].belongsTo(models["Role"], {
        foreignKey: "role_id"
      })
    }
  }
  RoleUser.init({
    id: {
      type: Sequelize.DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: Sequelize.DataTypes.BIGINT
    },
    role_id: {
      type: Sequelize.DataTypes.BIGINT
    }
  }, {
    sequelize,
    modelName: 'RoleUser',
    tableName: "role_user",
    createdAt: false,
    updatedAt: false
  });
  return RoleUser;
};