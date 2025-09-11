'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CategoriesNews extends Model {
    static associate(models) {
      
      CategoriesNews.hasMany(models.News, {
        foreignKey: 'fkIdCategoriesNews',
        as: 'news'
      });
    }
  }
  CategoriesNews.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CategoriesNews',
  });
  return CategoriesNews;
};