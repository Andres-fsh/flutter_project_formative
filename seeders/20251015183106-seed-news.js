'use strict';

module.exports = {
  async up (queryInterface) {
    const t = await queryInterface.sequelize.transaction();
    try {
      // busca categoría "Noticias"; si no existe, usa null
      const [cat] = await queryInterface.sequelize.query(
        "SELECT id FROM `categoriesnews` WHERE `name`=? LIMIT 1;",
        { replacements: ['Noticias'], transaction: t }
      );
      const catId = cat.length ? cat[0].id : null;
      const now = new Date();

      const items = [
        { title: 'Lanzamiento de proyecto SENNOVA', summary: 'Nueva iniciativa de innovación', picture: null, date: now },
        { title: 'Convocatoria abierta', summary: 'Se abre convocatoria para proyectos', picture: null, date: now }
      ];

      for (const it of items) {
        const [rows] = await queryInterface.sequelize.query(
          "SELECT id FROM `news` WHERE `title`=? LIMIT 1;",
          { replacements: [it.title], transaction: t }
        );
        if (!rows.length) {
          await queryInterface.bulkInsert('news', [{
            title: it.title,
            summary: it.summary,
            picture: it.picture,
            date: it.date,
            fkIdCategoriesNews: catId,
            createdAt: now, updatedAt: now
          }], { transaction: t });
        }
      }

      await t.commit();
    } catch (e) { await t.rollback(); throw e; }
  },
  async down (queryInterface) {
    await queryInterface.bulkDelete('news', {
      title: ['Lanzamiento de proyecto SENNOVA','Convocatoria abierta']
    }, {});
  }
};