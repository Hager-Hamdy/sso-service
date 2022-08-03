'use strict';
const {default: Sequelize} = require("sequelize");
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AppUser extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            AppUser.User = models["AppUser"].belongsTo(models["User"], {
                foreignKey: "user_id"
            })
            AppUser.App = models["AppUser"].belongsTo(models["App"], {
                foreignKey: "app_id"
            })
        }
    }
    AppUser.init({
        id: {
            type: Sequelize.DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.DataTypes.BIGINT
        },
        app_id: {
            type: Sequelize.DataTypes.BIGINT
        }
    }, {
        sequelize,
        modelName: 'AppUser',
        tableName: "app_user",
        createdAt: false,
        updatedAt: false
    });
    return AppUser;
};