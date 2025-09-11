'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InformationSennova extends Model {
    static associate(models) {
      
    }
  }
  InformationSennova.init({
    mision: DataTypes.STRING,
    vision: DataTypes.STRING,
    description: DataTypes.TEXT,
    staff: DataTypes.STRING,
    lineSennova: DataTypes.STRING,
    ourServices: DataTypes.STRING,
    updateDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'InformationSennova',
  });
  return InformationSennova;
};