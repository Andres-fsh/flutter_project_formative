'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ApplicationForms extends Model {
    static associate(models) {
      ApplicationForms.belongsTo(models.TypeForms, {
        foreignKey: 'fkIdTypeForms',  
        as: 'typeForm' 
      });
    }
  }
  ApplicationForms.init({
    userType: DataTypes.STRING,
    name: DataTypes.STRING,
    identificationType: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    companyName: DataTypes.STRING,
    description: DataTypes.TEXT,
    fkIdTypeForms: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ApplicationForms',
  });
  return ApplicationForms;
};