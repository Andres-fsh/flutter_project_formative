'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SatisfactionSurvey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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