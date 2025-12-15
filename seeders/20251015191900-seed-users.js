'use strict';
const bcrypt = require('bcryptjs');

const DEFAULT_AVATAR = '/public/images/default-avatar.png';

const usersSeed = [
  {
    userName: 'admin',
    email: 'admin@nnovaweb.test',
    name: 'Admin',
    lastName: 'Root',
    phone: '3000000001',
    roleName: 'Administrador',
    password: 'admin123'
  },
  {
    userName: 'coor',
    email: 'coor@nnovaweb.test',
    name: 'Coor',
    lastName: 'Dinator',
    phone: '3000000002',
    roleName: 'Coordinador',
    password: '123456'
  },
  {
    userName: 'invest',
    email: 'invest@nnovaweb.test',
    name: 'Inves',
    lastName: 'Tigator',
    phone: '3000000003',
    roleName: 'Investigador',
    password: '123456'
  },
  {
    userName: 'aprendiz',
    email: 'aprendiz@nnovaweb.test',
    name: 'Apren',
    lastName: 'Diz',
    phone: '3000000004',
    roleName: 'Aprendiz',
    password: '123456'
  }
];

module.exports = {
  async up (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      const usersTable = 'Users';
      const rolesTable = 'Roles';

      // Traer roles existentes (id por name)
      const roles = await queryInterface.sequelize.query(
        `SELECT id, name FROM "${rolesTable}" WHERE name IN (:names);`,
        {
          replacements: { names: ['Administrador', 'Coordinador', 'Investigador', 'Aprendiz'] },
          type: Sequelize.QueryTypes.SELECT,
          transaction: t
        }
      );
      const roleIdByName = Object.fromEntries(roles.map(r => [r.name, r.id]));

      const now = new Date();
      const rows = [];

      for (const u of usersSeed) {
        // Evitar duplicados por email
        const exists = await queryInterface.sequelize.query(
          `SELECT id FROM "${usersTable}" WHERE email = :email LIMIT 1;`,
          {
            replacements: { email: u.email },
            type: Sequelize.QueryTypes.SELECT,
            transaction: t
          }
        );
        if (exists.length) continue;

        rows.push({
          userName: u.userName,
          password: await bcrypt.hash(u.password, 10),
          email: u.email,
          name: u.name,
          lastName: u.lastName,
          phone: u.phone,
          photo: DEFAULT_AVATAR,
          fkIdRoles: roleIdByName[u.roleName] || null,
          createdAt: now,
          updatedAt: now
        });
      }

      if (rows.length) {
        await queryInterface.bulkInsert(usersTable, rows, { transaction: t });
      }

      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    // Borrar solo los usuarios sembrados por email
    await queryInterface.bulkDelete(
      'Users',
      { email: usersSeed.map(u => u.email) },
      {}
    );
  }
};