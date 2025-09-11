'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectSennova extends Model {
    static associate(models) {
      ProjectSennova.belongsTo(models.Consultancies, {
        foreignKey: 'fkIdConsultancies',  
        as: 'consultancy' 
      });
      
      ProjectSennova.belongsTo(models.LinesSennova, {
        foreignKey: 'fkIdLinesSennova',  
        as: 'lineSennova' 
      });
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