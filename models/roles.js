'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    static associate(models) {
     
      Roles.hasMany(models.Users, {
        foreignKey: 'fkIdRoles', 
        as: 'users' 
      });
    }
  }
  Roles.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Roles',
  });
  return Roles;
};