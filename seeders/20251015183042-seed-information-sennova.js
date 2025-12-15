'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      const table = 'InformationSennovas';
      const now = new Date();

      const payload = {
        mision: 'Impulsar la innovación y el conocimiento.',
        vision: 'Ser referente regional en investigación aplicada.',
        description: 'Centro de investigación y transferencia tecnológica.',
        staff: 'Equipo multidisciplinario',
        lineSennova: 'I+D, TT, Emprendimiento',
        ourServices: 'Consultorías, formación, acompañamiento',
        updateDate: now,
        createdAt: now,
        updatedAt: now
      };

      // Verificar si ya existe un registro
      const existing = await queryInterface.sequelize.query(
        `SELECT id FROM "${table}" LIMIT 1`,
        { type: Sequelize.QueryTypes.SELECT, transaction: t }
      );

      if (!existing.length) {
        await queryInterface.bulkInsert(
          table,
          [payload],
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
      'InformationSennovas',
      {
        description: 'Centro de investigación y transferencia tecnológica.'
      },
      {}
    );
  }
};