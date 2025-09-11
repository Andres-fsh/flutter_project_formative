'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('ApplicationForms', {
      fields: ['fkIdTypeForms'],
      type: 'foreign key',
      name: 'fk_applicationForms_typeForms',
      references: {
        table: 'TypeForms',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('ApplicationForms', 'fk_applicationForms_typeForms');
  }
};