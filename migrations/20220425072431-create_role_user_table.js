'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('role_user', {
      id: {
        type: Sequelize.DataTypes.BIGINT,

      },
      user_id: {
        type: Sequelize.DataTypes.BIGINT,
      },
      role_id: {
        type: Sequelize.DataTypes.BIGINT
      }
    }).then(() => queryInterface.addIndex('role_user', ['user_id', 'role_id'], {unique: true}));
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('role_user');
  }
};
