'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectsMonitoring extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProjectsMonitoring.init({
    phase: DataTypes.STRING,
    state: DataTypes.STRING,
    description: DataTypes.TEXT,
    registrationDate: DataTypes.DATE,
    fkIdUsers: DataTypes.INTEGER,
    fkIdProjectSennova: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProjectsMonitoring',
  });
  return ProjectsMonitoring;
};