'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InformationSennova extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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