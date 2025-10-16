'use strict';

module.exports = {
  async up (queryInterface) {
    const t = await queryInterface.sequelize.transaction();
    try {
      const items = [
        { name: 'Innovación y Desarrollo', description: 'Línea I+D' },
        { name: 'Transferencia Tecnológica', description: 'Línea TT' },
        { name: 'Emprendimiento', description: 'Línea de emprendimiento' }
      ];
      const now = new Date();

      for (const it of items) {
        const [rows] = await queryInterface.sequelize.query(
          "SELECT id FROM `linessennovas` WHERE `name`=? LIMIT 1;",
          { replacements: [it.name], transaction: t }
        );
        if (!rows.length) {
          await queryInterface.bulkInsert('linessennovas', [{
            name: it.name, description: it.description, fkIdUsers: null,
            createdAt: now, updatedAt: now
          }], { transaction: t });
        }
      }
      await t.commit();
    } catch (e) { await t.rollback(); throw e; }
  },
  async down (queryInterface) {
    await queryInterface.bulkDelete('linessennovas', {
      name: ['Innovación y Desarrollo','Transferencia Tecnológica','Emprendimiento']
    }, {});
  }
};