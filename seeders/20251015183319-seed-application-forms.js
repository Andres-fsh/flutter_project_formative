'use strict';

module.exports = {
  async up (queryInterface) {
    const t = await queryInterface.sequelize.transaction();
    try {
      const [tf] = await queryInterface.sequelize.query(
        "SELECT id FROM `typeforms` WHERE `description`=? LIMIT 1;",
        { replacements: ['Solicitud de asesoría'], transaction: t }
      );
      const tfId = tf.length ? tf[0].id : null;
      const now = new Date();

      const items = [
        { userType: 'Externo', name: 'Empresa XYZ', identificationType: 'NIT', email: 'contacto@xyz.com', phone: 111222333, companyName: 'XYZ SAS', description: 'Requiere asesoría en innovación', fkIdTypeForms: tfId },
      ];

      for (const it of items) {
        const [rows] = await queryInterface.sequelize.query(
          "SELECT id FROM `applicationforms` WHERE `email`=? AND `name`=? LIMIT 1;",
          { replacements: [it.email, it.name], transaction: t }
        );
        if (!rows.length) {
          await queryInterface.bulkInsert('applicationforms', [{
            userType: it.userType, name: it.name, identificationType: it.identificationType,
            email: it.email, phone: it.phone, companyName: it.companyName,
            description: it.description, fkIdTypeForms: it.fkIdTypeForms,
            createdAt: now, updatedAt: now
          }], { transaction: t });
        }
      }

      await t.commit();
    } catch (e) { await t.rollback(); throw e; }
  },
  async down (queryInterface) {
    await queryInterface.bulkDelete('applicationforms', {
      email: ['contacto@xyz.com']
    }, {});
  }
};
