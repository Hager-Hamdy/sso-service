'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      uuid: {
        type: Sequelize.DataTypes.STRING,
        length: 255
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        length: 255
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        length: 255
      },
      avatar: {
        type: Sequelize.DataTypes.STRING,
        length: 255
      },
      email_verified_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true
      },
      phone: {
        type: Sequelize.DataTypes.STRING,
        length: 15
      },
      phone_verified_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true
      },
      preferred_date_type: {
        type: Sequelize.DataTypes.ENUM,
        values: [
          'gregorian',
          'hijri'
        ]
      },
      status: {
        type: Sequelize.DataTypes.ENUM,
        values: [
          'super_admin',
          'active',
          'banned',
          'pending'
        ]
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        length: 255
      },
      remember_token: {
        type: Sequelize.DataTypes.STRING,
        length: 100
      },
      created_at: Sequelize.DataTypes.DATE,
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true
      },
      deleted_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true
      }
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
