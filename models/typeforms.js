'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TypeForms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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