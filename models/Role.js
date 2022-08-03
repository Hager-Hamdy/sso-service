'use strict';
const {default: Sequelize} = require("sequelize");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Role.Users = models["Role"].belongsToMany(models["User"], {
        timestamps: false,
        through: models["RoleUser"].tableName,
        foreignKey: "role_id"
      })
      Role.RoleUsers = models["Role"].hasMany(models["RoleUser"], {
        foreignKey: "role_id"
      })
      Role.RolePermissions = models["Role"].hasMany(models["PermissionRole"], {
        foreignKey: "role_id"
      })
      Role.Permissions = models["Role"].belongsToMany(models["Permission"], {
        timestamps: false,
        through: models["PermissionRole"].tableName,
        foreignKey: "role_id"
      })
    }
  }
  Role.init({
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
    is_default: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false
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
    },
  }, {
    sequelize,
    modelName: 'Role',
    tableName: "roles",
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at"
  });
  return Role;
};