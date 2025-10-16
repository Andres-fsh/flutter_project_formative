'use strict';

module.exports = {
  async up (queryInterface) {
    const t = await queryInterface.sequelize.transaction();
    try {
      // tomar una línea sennova cualquiera (o null si no hay)
      const [line] = await queryInterface.sequelize.query(
        "SELECT id FROM `linessennovas` ORDER BY id ASC LIMIT 1;", { transaction: t }
      );
      const lineId = line.length ? line[0].id : null;

      const items = [
        { description: 'Solicitud de asesoría' },
        { description: 'Encuesta de satisfacción' },
        { description: 'Registro de proyecto' }
      ];
      const now = new Date();

      for (const it of items) {
        const [rows] = await queryInterface.sequelize.query(
          "SELECT id FROM `typeforms` WHERE `description`=? LIMIT 1;",
          { replacements: [it.description], transaction: t }
        );
        if (!rows.length) {
          await queryInterface.bulkInsert('typeforms', [{
            description: it.description,
            fkIdLinesSennova: lineId,
            createdAt: now, updatedAt: now
          }], { transaction: t });
        }
      }
      await t.commit();
    } catch (e) { await t.rollback(); throw e; }
  },
  async down (queryInterface) {
    await queryInterface.bulkDelete('typeforms', {
      description: ['Solicitud de asesoría','Encuesta de satisfacción','Registro de proyecto']
    }, {});
  }
};
