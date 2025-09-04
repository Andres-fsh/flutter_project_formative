'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    static associate(models) {
      // Un rol tiene muchos usuarios
      Roles.hasMany(models.Users, {
        foreignKey: 'fkIdRoles', // La llave foránea en la tabla Users
        as: 'users' // Alias para la relación
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