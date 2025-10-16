'use strict';

module.exports = {
  async up (queryInterface) {
    const t = await queryInterface.sequelize.transaction();
    try {
      // Descubre columnas reales de la tabla
      const [cols] = await queryInterface.sequelize.query(
        "SHOW COLUMNS FROM `satisfactionsurveys`", { transaction: t }
      );
      const has = (name) => cols.some(c => c.Field === name);

      const now = new Date();

      // Construye el payload SOLO con las columnas que existan
      const payload = { createdAt: now, updatedAt: now };
      if (has('surveyOne'))   payload.surveyOne   = 'Excelente';
      if (has('surveyTwo'))   payload.surveyTwo   = 'Bueno';
      if (has('surveyThree')) payload.surveyThree = 'Excelente';
      if (has('surveyFour'))  payload.surveyFour  = 'Bueno';
      if (has('surveyFive'))  payload.surveyFive  = 'Excelente';
      if (has('surveySix'))   payload.surveySix   = 'Bueno';
      if (has('surveySeven')) payload.surveySeven = 'Excelente';
      if (has('surveyEight')) payload.surveyEight = 'Bueno';
      if (has('observations')) payload.observations = 'Todo ok';

      // si existe fk a typeforms, intenta asociar a "Encuesta de satisfacción"
      if (has('fkIdTypeForms')) {
        const [tf] = await queryInterface.sequelize.query(
          "SELECT id FROM `typeforms` WHERE `description`=? LIMIT 1;",
          { replacements: ['Encuesta de satisfacción'], transaction: t }
        );
        if (tf.length) payload.fkIdTypeForms = tf[0].id;
      }

      // ¿ya hay algún registro? si sí, no insertamos (sembramos 1 solo)
      const [exists] = await queryInterface.sequelize.query(
        "SELECT id FROM `satisfactionsurveys` LIMIT 1;", { transaction: t }
      );
      if (!exists.length) {
        await queryInterface.bulkInsert('satisfactionsurveys', [payload], { transaction: t });
      }

      await t.commit();
    } catch (e) {
      await t.rollback();
      throw e;
    }
  },

  async down (queryInterface) {
    // Intenta borrar por 'observations'; si no existe la columna, borra 1 registro
    try {
      await queryInterface.sequelize.query(
        "DELETE FROM `satisfactionsurveys` WHERE `observations`='Todo ok' LIMIT 1"
      );
    } catch (_) {
      await queryInterface.sequelize.query(
        "DELETE FROM `satisfactionsurveys` LIMIT 1"
      );
    }
  }
};
