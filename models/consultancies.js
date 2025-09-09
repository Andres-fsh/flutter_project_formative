'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Consultancies extends Model {
    static associate(models) {
      Consultancies.belongsTo(models.Users, {
        foreignKey: 'fkIdUsers',  
        as: 'user' 
      });
    }
  }
  Consultancies.init({
    date: DataTypes.DATE,
    state: DataTypes.STRING,
    description: DataTypes.STRING,
    fkIdUsers: DataTypes.INTEGER  
  }, {
    sequelize,
    modelName: 'Consultancies',
  });
  return Consultancies;
};