'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      // 1) Asegurar columna fkIdTypeForms en 'applicationforms'
      const appDesc = await queryInterface.describeTable('applicationforms');
      if (!appDesc.fkIdTypeForms) {
        await queryInterface.addColumn(
          'applicationforms',
          'fkIdTypeForms',
          { type: Sequelize.INTEGER, allowNull: true },
          { transaction: t }
        );
      }

      // 2) Asegurar FK -> typeforms(id)
      const fks = await queryInterface.getForeignKeyReferencesForTable('applicationforms');
      const hasFK = fks.some(fk => fk.constraintName === 'fk_applicationforms_typeforms');

      if (!hasFK) {
        await queryInterface.addConstraint('applicationforms', {
          fields: ['fkIdTypeForms'],
          type: 'foreign key',
          name: 'fk_applicationforms_typeforms',
          references: { table: 'typeforms', field: 'id' },
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
      try { await queryInterface.removeConstraint('applicationforms', 'fk_applicationforms_typeforms', { transaction: t }); } catch (_) {}
      const appDesc = await queryInterface.describeTable('applicationforms');
      if (appDesc.fkIdTypeForms) {
        await queryInterface.removeColumn('applicationforms', 'fkIdTypeForms', { transaction: t });
      }
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }
};
