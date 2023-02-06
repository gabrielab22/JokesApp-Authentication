'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Users', // table name
        'createdAt', // new field name
        {
          type: Sequelize.DATE,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Users',
        'updatedAt',
        {
          type: Sequelize.DATE,
          allowNull: true,
        },
      ),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Users', 'createdAt'),
      queryInterface.removeColumn('Users', 'updatedAt'),
    ]);
  }
};
