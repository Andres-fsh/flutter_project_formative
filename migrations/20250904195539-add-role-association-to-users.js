'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      // 1) Asegurar columna fkIdRoles en 'users'
      const usersDesc = await queryInterface.describeTable('Users', { transaction: t });
      if (!usersDesc.fkIdRoles) {
        await queryInterface.addColumn(
          'Users',
          'fkIdRoles',
          { type: Sequelize.INTEGER, allowNull: true },
          { transaction: t }
        );
      }

      // 2) Asegurar la FK fk_users_roles -> roles(id)
      const fks = await queryInterface.getForeignKeyReferencesForTable('Users', { transaction: t });

      const hasFK =
        fks.some(fk => fk.constraintName === 'fk_users_roles') ||
        fks.some(fk => fk.columnName === 'fkIdRoles' && fk.referencedTableName === 'Roles');

      if (!hasFK) {
        await queryInterface.addConstraint('Users', {
          fields: ['fkIdRoles'],
          type: 'foreign key',
          name: 'fk_users_roles',
          references: { table: 'Roles', field: 'id' },
          onDelete: 'CASCADE',
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
      try { await queryInterface.removeConstraint('Users', 'fk_users_roles', { transaction: t }); } catch (_) {}

      const usersDesc = await queryInterface.describeTable('Users', { transaction: t });
      if (usersDesc.fkIdRoles) {
        await queryInterface.removeColumn('Users', 'fkIdRoles', { transaction: t });
      }

      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }
};