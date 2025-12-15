'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      const usersTable = 'Users';
      const rolesTable = 'Roles';

      // 1) Asegurar columna fkIdRoles en 'Users'
      const usersDesc = await queryInterface.describeTable(usersTable, { transaction: t });
      if (!usersDesc.fkIdRoles) {
        await queryInterface.addColumn(
          usersTable,
          'fkIdRoles',
          { type: Sequelize.INTEGER, allowNull: true },
          { transaction: t }
        );
      }

      // 2) Asegurar FK fk_users_roles -> Roles(id)
      const fks = await queryInterface.getForeignKeyReferencesForTable(usersTable, { transaction: t });
      const hasFK =
        fks.some(fk => fk.constraintName === 'fk_users_roles') ||
        fks.some(fk => fk.columnName === 'fkIdRoles' && fk.referencedTableName === rolesTable);

      if (!hasFK) {
        await queryInterface.addConstraint(usersTable, {
          fields: ['fkIdRoles'],
          type: 'foreign key',
          name: 'fk_users_roles',
          references: { table: rolesTable, field: 'id' },
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
      const usersTable = 'Users';

      // Quitar FK si existe
      try { await queryInterface.removeConstraint(usersTable, 'fk_users_roles', { transaction: t }); } catch (_) {}

      // Quitar columna si existe
      const usersDesc = await queryInterface.describeTable(usersTable, { transaction: t });
      if (usersDesc.fkIdRoles) {
        await queryInterface.removeColumn(usersTable, 'fkIdRoles', { transaction: t });
      }

      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }
};