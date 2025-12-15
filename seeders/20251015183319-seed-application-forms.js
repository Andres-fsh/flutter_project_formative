'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      const typeFormsTable = 'TypeForms';
      const applicationFormsTable = 'ApplicationForms';

      // Buscar typeform "Solicitud de asesoría"
      const tfRows = await queryInterface.sequelize.query(
        `SELECT id FROM "${typeFormsTable}" WHERE description = :desc LIMIT 1;`,
        {
          replacements: { desc: 'Solicitud de asesoría' },
          type: Sequelize.QueryTypes.SELECT,
          transaction: t
        }
      );
      const tfId = tfRows.length ? tfRows[0].id : null;

      const now = new Date();

      const items = [
        {
          userType: 'Externo',
          name: 'Empresa XYZ',
          identificationType: 'NIT',
          email: 'contacto@xyz.com',
          phone: '3112223334',
          companyName: 'XYZ SAS',
          description: 'Requiere asesoria en innovacion',
          fkIdTypeForms: tfId
        }
      ];

      for (const it of items) {
        const existing = await queryInterface.sequelize.query(
          `SELECT id FROM "${applicationFormsTable}" WHERE email = :email AND name = :name LIMIT 1;`,
          {
            replacements: { email: it.email, name: it.name },
            type: Sequelize.QueryTypes.SELECT,
            transaction: t
          }
        );

        if (!existing.length) {
          await queryInterface.bulkInsert(
            applicationFormsTable,
            [{
              userType: it.userType,
              name: it.name,
              identificationType: it.identificationType,
              email: it.email,
              phone: it.phone,
              companyName: it.companyName,
              description: it.description,
              fkIdTypeForms: it.fkIdTypeForms,
              createdAt: now,
              updatedAt: now
            }],
            { transaction: t }
          );
        }
      }

      await t.commit();
    } catch (e) {
      await t.rollback();
      throw e;
    }
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete(
      'ApplicationForms',
      { email: ['contacto@xyz.com'] },
      {}
    );
  }
};