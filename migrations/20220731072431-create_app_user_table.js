'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('app_user', {
      id: {
        type: Sequelize.DataTypes.BIGINT,
      },
      user_id: {
        type: Sequelize.DataTypes.BIGINT
      },
      app_id: {
        type: Sequelize.DataTypes.BIGINT
      }
    }).then(() => queryInterface.addIndex('app_user', ['user_id', 'app_id'], {unique: true}));
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('app_user');
  }
};
