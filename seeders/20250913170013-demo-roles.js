'use strict';

/** @type {import('sequelize-cli').Migration} */
const rolesWanted = [
  { name: 'Administrador', description: 'Usuario con acceso total al sistema' },
  { name: 'Coordinador',   description: 'Usuario que coordina proyectos y actividades' },
  { name: 'Investigador',  description: 'Usuario que realiza actividades de investigación' },
  { name: 'Aprendiz',      description: 'Usuario en formación' }
];

module.exports = {
  async up (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      // Corrige el typo si existía en datos previos del dump
      await queryInterface.sequelize.query(
        "UPDATE `roles` SET `name`='Administrador' WHERE `name`='Aministrador';",
        { transaction: t }
      );

      // Inserta o actualiza los 4 roles sin duplicar
      for (const r of rolesWanted) {
        const [rows] = await queryInterface.sequelize.query(
          "SELECT `id` FROM `roles` WHERE `name` = ? LIMIT 1;",
          { replacements: [r.name], transaction: t }
        );

        if (!rows.length) {
          const now = new Date();
          await queryInterface.bulkInsert('roles', [{
            name: r.name,
            description: r.description,
            createdAt: now,
            updatedAt: now
          }], { transaction: t });
        } else {
          // opcional: mantener descripción actualizada
          await queryInterface.sequelize.query(
            "UPDATE `roles` SET `description` = ?, `updatedAt` = ? WHERE `name` = ?;",
            { replacements: [r.description, new Date(), r.name], transaction: t }
          );
        }
      }

      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    // Solo elimina los 4 que aseguramos (evita borrar otros ajenos)
    await queryInterface.bulkDelete('roles', {
      name: ['Administrador', 'Coordinador', 'Investigador', 'Aprendiz']
    }, {});
  }
};
