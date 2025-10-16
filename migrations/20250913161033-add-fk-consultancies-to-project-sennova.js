'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      const table = 'projectsennovas';
      const refTable = 'consultancies';

      // 1) asegurar columna fkIdConsultancies
      const desc = await queryInterface.describeTable(table);
      if (!desc.fkIdConsultancies) {
        await queryInterface.addColumn(
          table,
          'fkIdConsultancies',
          { type: Sequelize.INTEGER, allowNull: true },
          { transaction: t }
        );
      }

      // 2) asegurar FK -> consultancies(id)
      const fks = await queryInterface.getForeignKeyReferencesForTable(table);
      const hasFK = fks.some(fk => fk.constraintName === 'fk_projectsennovas_consultancies');

      if (!hasFK) {
        await queryInterface.addConstraint(table, {
          fields: ['fkIdConsultancies'],
          type: 'foreign key',
          name: 'fk_projectsennovas_consultancies',
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
      try { await queryInterface.removeConstraint(table, 'fk_projectsennovas_consultancies', { transaction: t }); } catch (_) {}

      // quitar columna si existe
      const desc = await queryInterface.describeTable(table);
      if (desc.fkIdConsultancies) {
        await queryInterface.removeColumn(table, 'fkIdConsultancies', { transaction: t });
      }

      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }
};
