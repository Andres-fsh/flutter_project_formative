'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      const table = 'satisfactionsurveys';
      const refTable = 'typeforms';

      // 1) asegurar columna fkIdTypeForms
      const desc = await queryInterface.describeTable(table);
      if (!desc.fkIdTypeForms) {
        await queryInterface.addColumn(
          table,
          'fkIdTypeForms',
          { type: Sequelize.INTEGER, allowNull: true },
          { transaction: t }
        );
      }

      // 2) asegurar FK -> typeforms(id)
      const fks = await queryInterface.getForeignKeyReferencesForTable(table);
      const hasFK = fks.some(fk => fk.constraintName === 'fk_satisfactionsurveys_typeforms');

      if (!hasFK) {
        await queryInterface.addConstraint(table, {
          fields: ['fkIdTypeForms'],
          type: 'foreign key',
          name: 'fk_satisfactionsurveys_typeforms',
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
      const table = 'satisfactionsurveys';

      // quitar FK si existe
      try { await queryInterface.removeConstraint(table, 'fk_satisfactionsurveys_typeforms', { transaction: t }); } catch (_) {}

      // quitar columna si existe
      const desc = await queryInterface.describeTable(table);
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
