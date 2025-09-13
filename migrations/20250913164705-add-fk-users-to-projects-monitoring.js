'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('ProjectsMonitorings', {
      fields: ['fkIdUsers'],
      type: 'foreign key',
      name: 'fk_projectsMonitoring_users',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('ProjectsMonitorings', 'fk_projectsMonitoring_users');
  }
};