'use strict';

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
      const table = 'Roles';

      // Obtener roles existentes
      const existing = await queryInterface.sequelize.query(
        `SELECT id, name FROM "${table}"`,
        { type: Sequelize.QueryTypes.SELECT, transaction: t }
      );

      const existingMap = new Map(existing.map(r => [r.name, r.id]));
      const now = new Date();

      for (const r of rolesWanted) {
        if (!existingMap.has(r.name)) {
          await queryInterface.bulkInsert(
            table,
            [{
              name: r.name,
              description: r.description,
              createdAt: now,
              updatedAt: now
            }],
            { transaction: t }
          );
        } else {
          await queryInterface.bulkUpdate(
            table,
            {
              description: r.description,
              updatedAt: now
            },
            { name: r.name },
            { transaction: t }
          );
        }
      }

      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete(
      'Roles',
      {
        name: ['Administrador', 'Coordinador', 'Investigador', 'Aprendiz']
      },
      {}
    );
  }
};