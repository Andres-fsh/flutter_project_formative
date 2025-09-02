'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Consultancies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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