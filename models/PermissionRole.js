'use strict';
const {default: Sequelize} = require("sequelize");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PermissionRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PermissionRole.Permission = models["PermissionRole"].belongsTo(models["Permission"], {
        foreignKey: "permission_id"
      })
      PermissionRole.Role = models["PermissionRole"].belongsTo(models["Role"], {
        foreignKey: "role_id"

      })
    }
  }
  PermissionRole.init({
    permission_id: {
      type: Sequelize.DataTypes.BIGINT
    },
    role_id: {
      type: Sequelize.DataTypes.BIGINT
    }
  }, {
    sequelize,
    modelName: 'PermissionRole',
    tableName: "permission_role",
    createdAt: false,
    updatedAt: false
  });
  return PermissionRole;
};