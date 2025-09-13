'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('ProjectsMonitorings', {
      fields: ['fkIdProjectSennova'],
      type: 'foreign key',
      name: 'fk_projectsMonitoring_projectSennova',
      references: {
        table: 'ProjectSennovas',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('ProjectsMonitorings', 'fk_projectsMonitoring_projectSennova');
  }
};