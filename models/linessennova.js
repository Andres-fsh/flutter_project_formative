'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LinesSennova extends Model {
    static associate(models) {
      LinesSennova.belongsTo(models.Users, {
        foreignKey: 'fkIdUsers',  
        as: 'user' 
      });
      
      
      LinesSennova.hasMany(models.TypeForms, {
        foreignKey: 'fkIdLinesSennova',
        as: 'typeForms'
      });
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