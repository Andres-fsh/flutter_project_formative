'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectsMonitoring extends Model {
    static associate(models) {
      ProjectsMonitoring.belongsTo(models.Users, {
        foreignKey: 'fkIdUsers',  
        as: 'user' 
      });
      
      ProjectsMonitoring.belongsTo(models.ProjectSennova, {
        foreignKey: 'fkIdProjectSennova',  
        as: 'projectSennova' 
      });
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