'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      const table = 'projectsennovas';
      const refTable = 'linessennovas'; // tabla real en tu BD

      // 1) asegurar columna fkIdLinesSennova
      const desc = await queryInterface.describeTable(table);
      if (!desc.fkIdLinesSennova) {
        await queryInterface.addColumn(
          table,
          'fkIdLinesSennova',
          { type: Sequelize.INTEGER, allowNull: true },
          { transaction: t }
        );
      }

      // 2) asegurar FK -> linessennovas(id)
      const fks = await queryInterface.getForeignKeyReferencesForTable(table);
      const hasFK = fks.some(fk => fk.constraintName === 'fk_projectsennovas_linessennovas');

      if (!hasFK) {
        await queryInterface.addConstraint(table, {
          fields: ['fkIdLinesSennova'],
          type: 'foreign key',
          name: 'fk_projectsennovas_linessennovas',
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
      const table = 'projectsennovas';

      // quitar FK si existe
      try { await queryInterface.removeConstraint(table, 'fk_projectsennovas_linessennovas', { transaction: t }); } catch (_) {}

      // quitar columna si existe
      const desc = await queryInterface.describeTable(table);
      if (desc.fkIdLinesSennova) {
        await queryInterface.removeColumn(table, 'fkIdLinesSennova', { transaction: t });
      }

      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }
};
