'use strict';

module.exports = {
  async up (queryInterface) {
    const t = await queryInterface.sequelize.transaction();
    try {
      const [[proj]] = await Promise.all([
        queryInterface.sequelize.query(
          "SELECT id FROM `projectsennovas` ORDER BY id ASC LIMIT 1;", { transaction: t }
        )
      ]);
      const [usr] = await queryInterface.sequelize.query(
        "SELECT id FROM `users` ORDER BY id ASC LIMIT 1;", { transaction: t }
      );

      if (!proj.length || !usr.length) return; // no-op si falta dependencia

      const now = new Date();
      const item = {
        phase: 'Inicial', state: 'En progreso', description: 'Kick-off',
        registrationDate: now, fkIdUsers: usr[0].id, fkIdProjectSennova: proj[0].id
      };

      const [exists] = await queryInterface.sequelize.query(
        "SELECT id FROM `projectsmonitorings` WHERE `description`=? LIMIT 1;",
        { replacements: [item.description], transaction: t }
      );
      if (!exists.length) {
        await queryInterface.bulkInsert('projectsmonitorings', [{
          ...item, createdAt: now, updatedAt: now
        }], { transaction: t });
      }

      await t.commit();
    } catch (e) { await t.rollback(); throw e; }
  },
  async down (queryInterface) {
    await queryInterface.bulkDelete('projectsmonitorings', {
      description: ['Kick-off']
    }, {});
  }
};
