'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      const table = 'news';
      const refTable = 'categoriesnews';

      // 1) Asegurar columna fkIdCategoriesNews en 'news'
      const desc = await queryInterface.describeTable(table);
      if (!desc.fkIdCategoriesNews) {
        await queryInterface.addColumn(
          table,
          'fkIdCategoriesNews',
          { type: Sequelize.INTEGER, allowNull: true },
          { transaction: t }
        );
      }

      // 2) Asegurar FK -> categoriesnews(id)
      const fks = await queryInterface.getForeignKeyReferencesForTable(table);
      const hasFK = fks.some(fk => fk.constraintName === 'fk_news_categoriesnews');

      if (!hasFK) {
        await queryInterface.addConstraint(table, {
          fields: ['fkIdCategoriesNews'],
          type: 'foreign key',
          name: 'fk_news_categoriesnews',
          references: { table: refTable, field: 'id' },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
          transaction: t
        });
      }

      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      const table = 'news';

      // Quitar FK si existe
      try { await queryInterface.removeConstraint(table, 'fk_news_categoriesnews', { transaction: t }); } catch (_) {}

      // Quitar columna si existe
      const desc = await queryInterface.describeTable(table);
      if (desc.fkIdCategoriesNews) {
        await queryInterface.removeColumn(table, 'fkIdCategoriesNews', { transaction: t });
      }

      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }
};
