'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('SatisfactionSurveys', {
      fields: ['fkIdTypeForms'],
      type: 'foreign key',
      name: 'fk_satisfactionSurveys_typeForms',
      references: {
        table: 'TypeForms',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('SatisfactionSurveys', 'fk_satisfactionSurveys_typeForms');
  }
};