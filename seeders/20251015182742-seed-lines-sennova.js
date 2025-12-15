'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      const table = 'LinesSennovas';

      const items = [
        { name: 'Innovación y Desarrollo', description: 'Línea I+D' },
        { name: 'Transferencia Tecnológica', description: 'Línea TT' },
        { name: 'Emprendimiento', description: 'Línea de emprendimiento' }
      ];

      const now = new Date();

      // Traer existentes una vez (más eficiente y sin SQL MySQL)
      const existing = await queryInterface.sequelize.query(
        `SELECT name FROM "${table}"`,
        { type: Sequelize.QueryTypes.SELECT, transaction: t }
      );
      const existingSet = new Set(existing.map(r => r.name));

      // Insertar solo los que falten
      const toInsert = items
        .filter(it => !existingSet.has(it.name))
        .map(it => ({
          name: it.name,
          description: it.description,
          fkIdUsers: null,
          createdAt: now,
          updatedAt: now
        }));

      if (toInsert.length) {
        await queryInterface.bulkInsert(table, toInsert, { transaction: t });
      }

      await t.commit();
    } catch (e) {
      await t.rollback();
      throw e;
    }
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete(
      'LinesSennovas',
      { name: ['Innovación y Desarrollo', 'Transferencia Tecnológica', 'Emprendimiento'] },
      {}
    );
  }
};