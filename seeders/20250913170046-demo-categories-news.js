'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('CategoriesNews', [
      {
        name: 'Noticias',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Eventos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Convocatorias',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Logros',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Proyectos',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CategoriesNews', null, {});
  }
};
//npx sequelize-cli db:seed:all