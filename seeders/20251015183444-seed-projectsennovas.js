'use strict';

module.exports = {
  async up (queryInterface) {
    const t = await queryInterface.sequelize.transaction();
    try {
      const [cons] = await queryInterface.sequelize.query(
        "SELECT id FROM `consultancies` ORDER BY id ASC LIMIT 1;", { transaction: t }
      );
      const [line] = await queryInterface.sequelize.query(
        "SELECT id FROM `linessennovas` ORDER BY id ASC LIMIT 1;", { transaction: t }
      );
      if (!cons.length || !line.length) return; // no-op si falta dependencia

      const now = new Date();
      const item = {
        name: 'Proyecto Alpha',
        description: 'Piloto de innovación',
        startDate: now, endDate: now,
        fkIdConsultancies: cons[0].id,
        fkIdLinesSennova: line[0].id
      };

      const [exists] = await queryInterface.sequelize.query(
        "SELECT id FROM `projectsennovas` WHERE `name`=? LIMIT 1;",
        { replacements: [item.name], transaction: t }
      );
      if (!exists.length) {
        await queryInterface.bulkInsert('projectsennovas', [{
          ...item, createdAt: now, updatedAt: now
        }], { transaction: t });
      }

      await t.commit();
    } catch (e) { await t.rollback(); throw e; }
  },
  async down (queryInterface) {
    await queryInterface.bulkDelete('projectsennovas', {
      name: ['Proyecto Alpha']
    }, {});
  }
};
