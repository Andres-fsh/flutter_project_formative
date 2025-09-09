'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('LinesSennovas', {
      fields: ['fkIdUsers'],
      type: 'foreign key',
      name: 'fk_linesSennova_users',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('LinesSennovas', 'fk_linesSennova_users');
  }
};