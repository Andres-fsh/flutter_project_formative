'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [
      {
        name: 'Administrador',
        description: 'Usuario con acceso total al sistema',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Coordinador',
        description: 'Usuario que coordina proyectos y actividades',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Investigador',
        description: 'Usuario que realiza actividades de investigación',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Aprendiz',
        description: 'Usuario en formación',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};