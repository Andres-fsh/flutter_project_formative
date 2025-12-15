'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      const projectsTable = 'ProjectSennovas';
      const usersTable = 'Users';
      const monitoringsTable = 'ProjectsMonitorings';

      const proj = await queryInterface.sequelize.query(
        `SELECT id FROM "${projectsTable}" ORDER BY id ASC LIMIT 1;`,
        { type: Sequelize.QueryTypes.SELECT, transaction: t }
      );

      const usr = await queryInterface.sequelize.query(
        `SELECT id FROM "${usersTable}" ORDER BY id ASC LIMIT 1;`,
        { type: Sequelize.QueryTypes.SELECT, transaction: t }
      );

      if (!proj.length || !usr.length) {
        await t.commit();
        return; // no-op si falta dependencia
      }

      const now = new Date();

      const item = {
        phase: 'Inicial',
        state: 'En progreso',
        description: 'Kick-off',
        registrationDate: now,
        fkIdUsers: usr[0].id,
        fkIdProjectSennova: proj[0].id
      };

      const exists = await queryInterface.sequelize.query(
        `SELECT id FROM "${monitoringsTable}" WHERE description = :desc LIMIT 1;`,
        {
          replacements: { desc: item.description },
          type: Sequelize.QueryTypes.SELECT,
          transaction: t
        }
      );

      if (!exists.length) {
        await queryInterface.bulkInsert(
          monitoringsTable,
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
      'ProjectsMonitorings',
      { description: ['Kick-off'] },
      {}
    );
  }
};