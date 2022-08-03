'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('permission_user', {
      id: {
        type: Sequelize.DataTypes.BIGINT,
      },
      permission_id: {
        type: Sequelize.DataTypes.BIGINT,
      },
      user_id: {
        type: Sequelize.DataTypes.BIGINT,

      },
      action: {
        type: Sequelize.DataTypes.ENUM,
        values: ["allow", "deny"]
      },
    }).then(() => queryInterface.addIndex('permission_user', ['user_id', 'permission_id'], {unique: true}));
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('permission_user');
  }
};
