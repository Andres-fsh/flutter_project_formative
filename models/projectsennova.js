'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectSennova extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProjectSennova.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    fkIdConsultancies: DataTypes.INTEGER,
    fkIdLinesSennova: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProjectSennova',
  });
  return ProjectSennova;
};