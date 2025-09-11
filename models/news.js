'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    static associate(models) {
      News.belongsTo(models.CategoriesNews, {
        foreignKey: 'fkIdCategoriesNews',  
        as: 'category' 
      });
    }
  }
  News.init({
    title: DataTypes.STRING,
    summary: DataTypes.TEXT,
    picture: DataTypes.STRING,
    date: DataTypes.DATE,
    fkIdCategoriesNews: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'News',
  });
  return News;
};