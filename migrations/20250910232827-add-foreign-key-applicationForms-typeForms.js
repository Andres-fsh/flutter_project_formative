'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      const table = 'ApplicationForms';
      const refTable = 'TypeForms';

      // 1) asegurar columna
      const desc = await queryInterface.describeTable(table, { transaction: t });
      if (!desc.fkIdTypeForms) {
        await queryInterface.addColumn(
          table,
          'fkIdTypeForms',
          { type: Sequelize.INTEGER, allowNull: true },
          { transaction: t }
        );
      }

      // 2) asegurar FK
      const fks = await queryInterface.getForeignKeyReferencesForTable(table, { transaction: t });
      const hasFK =
        fks.some(fk => fk.constraintName === 'fk_applicationforms_typeforms') ||
        fks.some(fk => fk.columnName === 'fkIdTypeForms' && fk.referencedTableName === refTable);

      if (!hasFK) {
        await queryInterface.addConstraint(table, {
          fields: ['fkIdTypeForms'],
          type: 'foreign key',
          name: 'fk_applicationforms_typeforms',
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
      const table = 'ApplicationForms';

      try {
        await queryInterface.removeConstraint(table, 'fk_applicationforms_typeforms', { transaction: t });
      } catch (_) {}

      const desc = await queryInterface.describeTable(table, { transaction: t });
      if (desc.fkIdTypeForms) {
        await queryInterface.removeColumn(table, 'fkIdTypeForms', { transaction: t });
      }

      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }
};