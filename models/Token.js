'use strict';
const {default: Sequelize} = require("sequelize");
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Token extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

        }
    }
    Token.init({
        id: {
            type: Sequelize.DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        token: {
            type: Sequelize.DataTypes.STRING,
            length: 255
        },
        created_at: {
            type: Sequelize.DataTypes.DATE,
            field: "created_at"
        },
    }, {
        sequelize,
        modelName: 'Token',
        tableName: "tokens",
        createdAt: "created_at",
        updatedAt: false
    });
    return Token;
};