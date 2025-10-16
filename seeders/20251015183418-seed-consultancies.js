'use strict';

module.exports = {
  async up (queryInterface) {
    const t = await queryInterface.sequelize.transaction();
    try {
      // usa el primer usuario disponible (si no hay, no siembra)
      const [usr] = await queryInterface.sequelize.query(
        "SELECT id FROM `users` ORDER BY id ASC LIMIT 1;", { transaction: t }
      );
      if (!usr.length) return; // no-op si no hay usuarios

      const uid = usr[0].id;
      const now = new Date();
      const items = [
        { date: now, state: 'Abierta', description: 'Asesoría inicial', fkIdUsers: uid }
      ];

      for (const it of items) {
        const [rows] = await queryInterface.sequelize.query(
          "SELECT id FROM `consultancies` WHERE `description`=? LIMIT 1;",
          { replacements: [it.description], transaction: t }
        );
        if (!rows.length) {
          await queryInterface.bulkInsert('consultancies', [{
            date: it.date, state: it.state, description: it.description,
            fkIdUsers: it.fkIdUsers, createdAt: now, updatedAt: now
          }], { transaction: t });
        }
      }

      await t.commit();
    } catch (e) { await t.rollback(); throw e; }
  },
  async down (queryInterface) {
    await queryInterface.bulkDelete('consultancies', {
      description: ['Asesoría inicial']
    }, {});
  }
};
