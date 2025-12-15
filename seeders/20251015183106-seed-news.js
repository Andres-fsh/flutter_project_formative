'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      const categoriesTable = 'CategoriesNews';
      const newsTable = 'News';

      // Buscar categoría "Noticias"; si no existe, usar null
      const catRows = await queryInterface.sequelize.query(
        `SELECT id FROM "${categoriesTable}" WHERE name = :name LIMIT 1;`,
        {
          replacements: { name: 'Noticias' },
          type: Sequelize.QueryTypes.SELECT,
          transaction: t
        }
      );
      const catId = catRows.length ? catRows[0].id : null;

      const now = new Date();

      const items = [
        { title: 'Lanzamiento de proyecto SENNOVA', summary: 'Nueva iniciativa de innovación', picture: null, date: now },
        { title: 'Convocatoria abierta', summary: 'Se abre convocatoria para proyectos', picture: null, date: now }
      ];

      // Traer títulos existentes para no duplicar (usar IN en vez de ANY)
      const titles = items.map(i => i.title);

      const existing = await queryInterface.sequelize.query(
        `SELECT title FROM "${newsTable}" WHERE title IN (:titles);`,
        {
          replacements: { titles },
          type: Sequelize.QueryTypes.SELECT,
          transaction: t
        }
      );

      const existingSet = new Set(existing.map(r => r.title));

      const toInsert = items
        .filter(it => !existingSet.has(it.title))
        .map(it => ({
          title: it.title,
          summary: it.summary,
          picture: it.picture,
          date: it.date,
          fkIdCategoriesNews: catId,
          createdAt: now,
          updatedAt: now
        }));

      if (toInsert.length) {
        await queryInterface.bulkInsert(newsTable, toInsert, { transaction: t });
      }

      await t.commit();
    } catch (e) {
      await t.rollback();
      throw e;
    }
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete(
      'News',
      { title: ['Lanzamiento de proyecto SENNOVA', 'Convocatoria abierta'] },
      {}
    );
  }
};