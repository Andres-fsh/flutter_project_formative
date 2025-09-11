'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SatisfactionSurvey extends Model {
    static associate(models) {
      SatisfactionSurvey.belongsTo(models.TypeForms, {
        foreignKey: 'fkIdTypeForms',  
        as: 'typeForm' 
      });
    }
  }
  SatisfactionSurvey.init({
    surveyOne: DataTypes.TEXT,
    surveyTwo: DataTypes.TEXT,
    surveyThree: DataTypes.TEXT,
    surveyFour: DataTypes.TEXT,
    surveyFive: DataTypes.TEXT,
    surveySix: DataTypes.TEXT,
    surveySeven: DataTypes.TEXT,
    surveyEight: DataTypes.TEXT,
    observations: DataTypes.TEXT,
    fkIdTypeForms: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SatisfactionSurvey',
  });
  return SatisfactionSurvey;
};