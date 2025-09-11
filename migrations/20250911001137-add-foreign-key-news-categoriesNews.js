'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('News', {
      fields: ['fkIdCategoriesNews'],
      type: 'foreign key',
      name: 'fk_news_categoriesNews',
      references: {
        table: 'CategoriesNews',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('News', 'fk_news_categoriesNews');
  }
};