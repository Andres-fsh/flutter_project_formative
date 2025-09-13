'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('ProjectSennovas', {
      fields: ['fkIdLinesSennova'],
      type: 'foreign key',
      name: 'fk_projectSennova_linesSennova',
      references: {
        table: 'LinesSennovas',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('ProjectSennovas', 'fk_projectSennova_linesSennova');
  }
};