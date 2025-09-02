'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ApplicationForms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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