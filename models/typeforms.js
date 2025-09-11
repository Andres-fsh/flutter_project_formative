'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TypeForms extends Model {
    static associate(models) {
      TypeForms.belongsTo(models.LinesSennova, {
        foreignKey: 'fkIdLinesSennova',  
        as: 'lineSennova' 
      });
      
      TypeForms.hasMany(models.ApplicationForms, {
        foreignKey: 'fkIdTypeForms',
        as: 'applicationForms'
      });
      
    
      TypeForms.hasMany(models.SatisfactionSurvey, {
        foreignKey: 'fkIdTypeForms',
        as: 'satisfactionSurveys'
      });
    }
  }
  TypeForms.init({
    description: DataTypes.STRING,
    fkIdLinesSennova: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TypeForms',
  });
  return TypeForms;
};