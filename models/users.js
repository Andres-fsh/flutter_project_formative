'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.belongsTo(models.Roles, {
        foreignKey: 'fkIdRoles', 
        as: 'role' 
      });
      
      // Un usuario puede tener muchas consultorías
      Users.hasMany(models.Consultancies, {
        foreignKey: 'fkIdUsers',
        as: 'consultancies'
      });
    }
  }
  Users.init({
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    fkIdRoles: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};