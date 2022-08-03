'use strict';

const {default: Sequelize} = require("sequelize");
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('apps', {

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

    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('apps');
  }
};
