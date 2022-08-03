'use strict';

const Sequelize = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('permissions', {
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
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('permissions');
  }
};
