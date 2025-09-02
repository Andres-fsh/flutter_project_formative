'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('InformationSennovas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mision: {
        type: Sequelize.STRING
      },
      vision: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      staff: {
        type: Sequelize.STRING
      },
      lineSennova: {
        type: Sequelize.STRING
      },
      ourServices: {
        type: Sequelize.STRING
      },
      updateDate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('InformationSennovas');
  }
};