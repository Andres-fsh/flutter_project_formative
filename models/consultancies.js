'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Consultancies extends Model {
    static associate(models) {
      // Una consultoría pertenece a un usuario
      Consultancies.belongsTo(models.Users, {
        foreignKey: 'fkIdUsers',  // ← MISMO NOMBRE que en la migración
        as: 'user' 
      });
    }
  }
  Consultancies.init({
    date: DataTypes.DATE,
    state: DataTypes.STRING,
    description: DataTypes.STRING,
    fkIdUsers: DataTypes.INTEGER  // ← MISMO NOMBRE
  }, {
    sequelize,
    modelName: 'Consultancies',
  });
  return Consultancies;
};