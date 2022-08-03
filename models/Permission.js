'use strict';
const {default: Sequelize} = require("sequelize");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Permission.PermissionRoles = models["Permission"].hasMany(models["PermissionRole"], {
        foreignKey: "permission_id"
      })
      Permission.Roles = models["Permission"].belongsToMany(models["Role"], {
        timestamps: false,
        through: models["PermissionRole"].tableName,
        foreignKey: "permission_id"
      })
      Permission.PermissionUsers = models["Permission"].hasMany(models["PermissionUser"], {
        foreignKey: "permission_id"
      })
      Permission.Users = models["Permission"].belongsToMany(models["User"], {
        timestamps: false,
        through: models["PermissionUser"].tableName,
        foreignKey: "permission_id"
      })



    }
  }
  Permission.init({
    id: {
      type: Sequelize.DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.DataTypes.STRING,
      length: 255,
      allowNull: true
    },
    slug: {
      type: Sequelize.DataTypes.STRING,
      length: 255,
      allowNull: false,
      unique: true,
    },
    app_name: {
      type: Sequelize.DataTypes.STRING,
    },
    description: {
      type: Sequelize.DataTypes.TEXT
    },
    created_at: {
      type: Sequelize.DataTypes.DATE,
      field: "created_at"
    },
    updated_at: {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
      field: "updated_at"
    },
    deleted_at: {
      type: Sequelize.DataTypes.DATE,
      field: "deleted_at"
    }
  }, {
    sequelize,
    modelName: 'Permission',
    tableName: "permissions",
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at"
  });
  return Permission;
};