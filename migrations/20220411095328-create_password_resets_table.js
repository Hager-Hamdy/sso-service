'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('password_resets', {
      email: {
        type: Sequelize.DataTypes.STRING,
        length: 255
      },
      token: {
        type: Sequelize.DataTypes.STRING,
        length: 255
      },
      created_at: {
        type: Sequelize.DataTypes.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('password_resets');
  }
};
