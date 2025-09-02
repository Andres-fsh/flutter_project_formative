'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LinesSennova extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LinesSennova.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    fkIdUsers: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'LinesSennova',
  });
  return LinesSennova;
};