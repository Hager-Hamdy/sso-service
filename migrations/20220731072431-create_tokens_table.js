'use strict';

const {default: Sequelize} = require("sequelize");
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('tokens', {
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
      }
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('tokens');
  }
};
