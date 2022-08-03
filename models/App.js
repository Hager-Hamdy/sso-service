'use strict';
const {default: Sequelize} = require("sequelize");
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class App extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    App.init({
        id: {
            type: Sequelize.DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        ip: {
            type: Sequelize.DataTypes.BIGINT,
            unique: true
        },
        name: {
            type: Sequelize.DataTypes.STRING,
            length: 255
        },
        created_at: {
            type: Sequelize.DataTypes.DATE,
            field: "created_at"
        },
        updated_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
            field: "updated_at"
        }
    }, {
        sequelize,
        modelName: 'App',
        tableName: "apps",
        createdAt: "created_at",
        updatedAt: "updated_at"
    });
    return App;
};