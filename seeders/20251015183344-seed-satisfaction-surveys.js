'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      const surveysTable = 'SatisfactionSurveys';
      const typeFormsTable = 'TypeForms';

      // 1) Descubre columnas reales (Postgres)
      const cols = await queryInterface.sequelize.query(
        `
        SELECT column_name
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = :table
        `,
        {
          replacements: { table: surveysTable }, // en Postgres se guarda case-sensitive si la creaste con comillas
          type: Sequelize.QueryTypes.SELECT,
          transaction: t
        }
      );

      // Si no devolvió nada por case, intenta en minúscula (fallback seguro)
      let colNames = cols.map(c => c.column_name);
      if (!colNames.length) {
        const cols2 = await queryInterface.sequelize.query(
          `
          SELECT column_name
          FROM information_schema.columns
          WHERE table_schema = 'public'
            AND table_name = :table
          `,
          {
            replacements: { table: surveysTable.toLowerCase() },
            type: Sequelize.QueryTypes.SELECT,
            transaction: t
          }
        );
        colNames = cols2.map(c => c.column_name);
      }

      const has = (name) => colNames.includes(name);
      const now = new Date();

      // 2) Construye payload SOLO con las columnas que existan
      const payload = { createdAt: now, updatedAt: now };
      if (has('surveyOne'))    payload.surveyOne = 'Excelente';
      if (has('surveyTwo'))    payload.surveyTwo = 'Bueno';
      if (has('surveyThree'))  payload.surveyThree = 'Excelente';
      if (has('surveyFour'))   payload.surveyFour = 'Bueno';
      if (has('surveyFive'))   payload.surveyFive = 'Excelente';
      if (has('surveySix'))    payload.surveySix = 'Bueno';
      if (has('surveySeven'))  payload.surveySeven = 'Excelente';
      if (has('surveyEight'))  payload.surveyEight = 'Bueno';
      if (has('observations')) payload.observations = 'Todo ok';

      // 3) Si existe fk a typeforms, asociar a "Encuesta de satisfacción"
      if (has('fkIdTypeForms')) {
        const tf = await queryInterface.sequelize.query(
          `SELECT id FROM "${typeFormsTable}" WHERE description = :desc LIMIT 1;`,
          {
            replacements: { desc: 'Encuesta de satisfacción' },
            type: Sequelize.QueryTypes.SELECT,
            transaction: t
          }
        );
        if (tf.length) payload.fkIdTypeForms = tf[0].id;
      }

      // 4) Insertar solo si no existe ningún registro
      const exists = await queryInterface.sequelize.query(
        `SELECT id FROM "${surveysTable}" LIMIT 1;`,
        { type: Sequelize.QueryTypes.SELECT, transaction: t }
      );

      if (!exists.length) {
        await queryInterface.bulkInsert(surveysTable, [payload], { transaction: t });
      }

      await t.commit();
    } catch (e) {
      await t.rollback();
      throw e;
    }
  },

  async down (queryInterface, Sequelize) {
    const surveysTable = 'SatisfactionSurveys';

    // En Postgres no existe LIMIT en DELETE directo; usamos una subquery.
    // Si existe columna observations, borramos 1 fila que coincida; si no, borramos 1 fila cualquiera.
    try {
      await queryInterface.sequelize.query(
        `
        DELETE FROM "${surveysTable}"
        WHERE id IN (
          SELECT id FROM "${surveysTable}"
          WHERE observations = 'Todo ok'
          LIMIT 1
        );
        `,
        { transaction: null }
      );
    } catch (_) {
      await queryInterface.sequelize.query(
        `
        DELETE FROM "${surveysTable}"
        WHERE id IN (
          SELECT id FROM "${surveysTable}"
          LIMIT 1
        );
        `,
        { transaction: null }
      );
    }
  }
};