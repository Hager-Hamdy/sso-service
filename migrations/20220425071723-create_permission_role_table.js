'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('permission_role', {
      id: {
        type: Sequelize.DataTypes.BIGINT,
      },
      permission_id: {
        type: Sequelize.DataTypes.BIGINT,
      },
      role_id: {
        type: Sequelize.DataTypes.BIGINT,
      },
    }).then(() => queryInterface.addIndex('permission_role', ['role_id', 'permission_id'], {unique: true}));

    },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('permission_role');
  }
};
