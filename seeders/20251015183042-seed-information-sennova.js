'use strict';

module.exports = {
  async up (queryInterface) {
    const t = await queryInterface.sequelize.transaction();
    try {
      const now = new Date();

      const payload = {
        mission: 'Impulsar la innovación y el conocimiento.',
        vision: 'Ser referente regional en investigación aplicada.',
        description: 'Centro de investigación y transferencia tecnológica.',
        staff: 'Equipo multidisciplinario',
        lineSennova: 'I+D, TT, Emprendimiento',
        ourServices: 'Consultorías, formación, acompañamiento',
        updateDate: now,
        createdAt: now,
        updatedAt: now
      };

      // Si ya hay un registro, no insertamos otro
      const [exists] = await queryInterface.sequelize.query(
        "SELECT id FROM `informationsennovas` LIMIT 1;", { transaction: t }
      );
      if (!exists.length) {
        await queryInterface.bulkInsert('informationsennovas', [payload], { transaction: t });
      }

      await t.commit();
    } catch (e) { await t.rollback(); throw e; }
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('informationsennovas', {
      description: 'Centro de investigación y transferencia tecnológica.'
    }, {});
  }
};