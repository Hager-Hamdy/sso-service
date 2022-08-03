'use strict';
const {default: Sequelize} = require("sequelize");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PermissionUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     **/
    static associate(models) {
      PermissionUser.Permission = models["PermissionUser"].belongsTo(models["Permission"], {
        foreignKey: "permission_id"
      })
      PermissionUser.User = models["PermissionUser"].belongsTo(models["User"], {
        foreignKey: "user_id"
      })
    }
  }
  PermissionUser.init({
    id: {
      type: Sequelize.DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    permission_id: {
      type: Sequelize.DataTypes.BIGINT
    },
    user_id: {
      type: Sequelize.DataTypes.BIGINT
    }
  }, {
    sequelize,
    modelName: 'PermissionUser',
    tableName: "permission_user",
    createdAt: false,
    updatedAt: false
  });
  return PermissionUser;
};