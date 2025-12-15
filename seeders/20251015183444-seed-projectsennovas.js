'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      const consultanciesTable = 'Consultancies';
      const linesTable = 'LinesSennovas';
      const projectsTable = 'ProjectSennovas';

      // Tomar primera consultoría
      const cons = await queryInterface.sequelize.query(
        `SELECT id FROM "${consultanciesTable}" ORDER BY id ASC LIMIT 1;`,
        { type: Sequelize.QueryTypes.SELECT, transaction: t }
      );

      // Tomar primera línea sennova
      const line = await queryInterface.sequelize.query(
        `SELECT id FROM "${linesTable}" ORDER BY id ASC LIMIT 1;`,
        { type: Sequelize.QueryTypes.SELECT, transaction: t }
      );

      if (!cons.length || !line.length) {
        await t.commit();
        return; // no-op si falta dependencia
      }

      const now = new Date();

      const item = {
        name: 'Proyecto Alpha',
        description: 'Piloto de innovación',
        startDate: now,
        endDate: now,
        fkIdConsultancies: cons[0].id,
        fkIdLinesSennova: line[0].id
      };

      // Verificar si ya existe
      const exists = await queryInterface.sequelize.query(
        `SELECT id FROM "${projectsTable}" WHERE name = :name LIMIT 1;`,
        {
          replacements: { name: item.name },
          type: Sequelize.QueryTypes.SELECT,
          transaction: t
        }
      );

      if (!exists.length) {
        await queryInterface.bulkInsert(
          projectsTable,
          [{
            ...item,
            createdAt: now,
            updatedAt: now
          }],
          { transaction: t }
        );
      }

      await t.commit();
    } catch (e) {
      await t.rollback();
      throw e;
    }
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete(
      'ProjectSennovas',
      { name: ['Proyecto Alpha'] },
      {}
    );
  }
};