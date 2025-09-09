'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('TypeForms', {
      fields: ['fkIdLinesSennova'],
      type: 'foreign key',
      name: 'fk_typeForms_linesSennova',
      references: {
        table: 'LinesSennovas',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('TypeForms', 'fk_typeForms_linesSennova');
  }
};