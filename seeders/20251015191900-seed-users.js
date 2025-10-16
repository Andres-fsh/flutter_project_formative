'use strict';
const bcrypt = require('bcryptjs');

const DEFAULT_AVATAR = '/public/images/default-avatar.png';

const usersSeed = [
  { userName: 'admin',    email: 'admin@nnovaweb.test',    name: 'Admin',  lastName: 'Root',    phone: 300000001, roleName: 'Administrador', password: 'admin123' },
  { userName: 'coor',     email: 'coor@nnovaweb.test',     name: 'Coor',   lastName: 'Dinator', phone: 300000002, roleName: 'Coordinador',   password: '123456'   },
  { userName: 'invest',   email: 'invest@nnovaweb.test',   name: 'Inves',  lastName: 'Tigator', phone: 300000003, roleName: 'Investigador',  password: '123456'   },
  { userName: 'aprendiz', email: 'aprendiz@nnovaweb.test', name: 'Apren',  lastName: 'Diz',     phone: 300000004, roleName: 'Aprendiz',      password: '123456'   }
];

module.exports = {
  async up (queryInterface) {
    const t = await queryInterface.sequelize.transaction();
    try {
      // 0) Descubre columnas reales de 'users'
      const [cols] = await queryInterface.sequelize.query(
        "SHOW COLUMNS FROM `users`", { transaction: t }
      );
      const have = name => cols.some(c => c.Field.toLowerCase() === name.toLowerCase());
      const colName = (...candidates) => {
        for (const c of candidates) {
          const hit = cols.find(k => k.Field.toLowerCase() === c.toLowerCase());
          if (hit) return hit.Field;
        }
        return null;
      };

      const kUserName  = colName('userName','username','user_name');
      const kPassword  = colName('password','pass');
      const kEmail     = colName('email','mail');
      const kName      = colName('name','firstName','firstname','first_name');
      const kLastName  = colName('lastName','lastname','last_name','surname','apellido');
      const kPhone     = colName('phone','telefono','tel');
      const kPhoto     = colName('photo','avatar','foto');
      const kFkRole    = colName('fkIdRoles','fkidroles','roleId','role_id');
      const kCreatedAt = colName('createdAt','created_at');
      const kUpdatedAt = colName('updatedAt','updated_at');

      // 1) Mapea roles por nombre -> id
      const [roles] = await queryInterface.sequelize.query(
        "SELECT id, name FROM `roles` WHERE name IN ('Administrador','Coordinador','Investigador','Aprendiz');",
        { transaction: t }
      );
      const roleIdByName = Object.fromEntries(roles.map(r => [r.name, r.id]));

      const now = new Date();
      const rows = [];

      for (const u of usersSeed) {
        // Evita duplicados por email (si existe esa columna)
        if (kEmail) {
          const [exists] = await queryInterface.sequelize.query(
            "SELECT id FROM `users` WHERE `" + kEmail + "`=? LIMIT 1;",
            { replacements: [u.email], transaction: t }
          );
          if (exists.length) continue;
        }

        const row = {};
        if (kUserName)  row[kUserName]  = u.userName;
        if (kPassword)  row[kPassword]  = await bcrypt.hash(u.password, 10);
        if (kEmail)     row[kEmail]     = u.email;
        if (kName)      row[kName]      = u.name;
        if (kLastName)  row[kLastName]  = u.lastName;
        if (kPhone)     row[kPhone]     = u.phone;
        if (kPhoto)     row[kPhoto]     = DEFAULT_AVATAR;
        if (kFkRole)    row[kFkRole]    = roleIdByName[u.roleName] || null;
        if (kCreatedAt) row[kCreatedAt] = now;
        if (kUpdatedAt) row[kUpdatedAt] = now;

        rows.push(row);
      }

      if (rows.length) {
        await queryInterface.bulkInsert('users', rows, { transaction: t });
      }

      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  },

  async down (queryInterface) {
    // Borra por email si existe columna; si no, borra por límites
    try {
      await queryInterface.bulkDelete('users', {
        email: usersSeed.map(u => u.email)
      }, {});
    } catch (_) {
      await queryInterface.sequelize.query("DELETE FROM `users` LIMIT 4");
    }
  }
};
