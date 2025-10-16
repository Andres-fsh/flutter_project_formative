'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      // 1) Asegurar columna fkIdRoles en 'users'
      const usersDesc = await queryInterface.describeTable('users');
      if (!usersDesc.fkIdRoles) {
        await queryInterface.addColumn(
          'users',
          'fkIdRoles',
          { type: Sequelize.INTEGER, allowNull: true },
          { transaction: t }
        );
      }

      // 2) Asegurar FK fk_users_roles -> roles(id)
      const fks = await queryInterface.getForeignKeyReferencesForTable('users');
      const hasFK = fks.some(fk => fk.constraintName === 'fk_users_roles');
      if (!hasFK) {
        await queryInterface.addConstraint('users', {
          fields: ['fkIdRoles'],
          type: 'foreign key',
          name: 'fk_users_roles',
          references: { table: 'roles', field: 'id' },
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

  async down (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      // Quitar FK si existe
      try { await queryInterface.removeConstraint('users', 'fk_users_roles', { transaction: t }); } catch (_) {}
      // Quitar columna si existe
      const usersDesc = await queryInterface.describeTable('users');
      if (usersDesc.fkIdRoles) {
        await queryInterface.removeColumn('users', 'fkIdRoles', { transaction: t });
      }
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }
};
