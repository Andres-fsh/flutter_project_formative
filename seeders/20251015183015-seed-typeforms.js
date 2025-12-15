'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      const linesTable = 'LinesSennovas';
      const typeFormsTable = 'TypeForms';

      // Tomar una línea sennova cualquiera (o null si no hay)
      const lineRow = await queryInterface.sequelize.query(
        `SELECT id FROM "${linesTable}" ORDER BY id ASC LIMIT 1;`,
        { type: Sequelize.QueryTypes.SELECT, transaction: t }
      );
      const lineId = lineRow.length ? lineRow[0].id : null;

      const items = [
        { description: 'Solicitud de asesoría' },
        { description: 'Encuesta de satisfacción' },
        { description: 'Registro de proyecto' }
      ];
      const now = new Date();

      // Traer existentes en una sola consulta
      const existing = await queryInterface.sequelize.query(
        `SELECT description FROM "${typeFormsTable}"`,
        { type: Sequelize.QueryTypes.SELECT, transaction: t }
      );
      const existingSet = new Set(existing.map(r => r.description));

      const toInsert = items
        .filter(it => !existingSet.has(it.description))
        .map(it => ({
          description: it.description,
          fkIdLinesSennova: lineId,
          createdAt: now,
          updatedAt: now
        }));

      if (toInsert.length) {
        await queryInterface.bulkInsert(typeFormsTable, toInsert, { transaction: t });
      }

      await t.commit();
    } catch (e) {
      await t.rollback();
      throw e;
    }
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete(
      'TypeForms',
      {
        description: [
          'Solicitud de asesoría',
          'Encuesta de satisfacción',
          'Registro de proyecto'
        ]
      },
      {}
    );
  }
};