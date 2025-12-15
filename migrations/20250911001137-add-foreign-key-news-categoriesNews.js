'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      const table = 'News';
      const refTable = 'CategoriesNews';

      // 1) Asegurar columna fkIdCategoriesNews en 'News'
      const desc = await queryInterface.describeTable(table, { transaction: t });
      if (!desc.fkIdCategoriesNews) {
        await queryInterface.addColumn(
          table,
          'fkIdCategoriesNews',
          { type: Sequelize.INTEGER, allowNull: true },
          { transaction: t }
        );
      }

      // 2) Asegurar FK -> CategoriesNews(id)
      const fks = await queryInterface.getForeignKeyReferencesForTable(table, { transaction: t });

      const hasFK =
        fks.some(fk => fk.constraintName === 'fk_news_categoriesnews') ||
        fks.some(fk => fk.columnName === 'fkIdCategoriesNews' && fk.referencedTableName === refTable);

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

  async down (queryInterface) {
    const t = await queryInterface.sequelize.transaction();
    try {
      const table = 'News';

      // Quitar FK si existe
      try {
        await queryInterface.removeConstraint(table, 'fk_news_categoriesnews', { transaction: t });
      } catch (_) {}

      // Quitar columna si existe
      const desc = await queryInterface.describeTable(table, { transaction: t });
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