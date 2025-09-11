const db = require('../models');

const getAllNews = async () => {
    try {
        let news = await db.News.findAll({
            include: [{
                model: db.CategoriesNews,
                as: 'category',
                attributes: ['id', 'name']
            }]
        });
        return news;
    } catch (error) {
        return error.message || "Failed to get news";
    }
};

const getNews = async (id) => {
    try {
        let news = await db.News.findByPk(id, {
            include: [{
                model: db.CategoriesNews,
                as: 'category',
                attributes: ['id', 'name']
            }]
        });
    
        return news;
    } catch (error) {
        return error.message || "Failed to get news";
    }
};

const createNews = async (title, summary, picture, date, fkIdCategoriesNews) => {
    try {
        let newNews = await db.News.create({
            title,
            summary,
            picture,
            date,
            fkIdCategoriesNews
        });
        return newNews;
    } catch (error) {
        return error.message || "News could not be created";
    }
};

const updateNews = async (id, title, summary, picture, date, fkIdCategoriesNews) => {
    try {
        let updatedNews = await db.News.update({
            title,
            summary,
            picture,
            date,
            fkIdCategoriesNews
        }, {
            where: { id }
        });
        return updatedNews;
    } catch (error) {
        return error.message || "News could not be updated";
    }
};

const deleteNews = async (id) => {
    try {
        const deletedNews = await db.News.destroy({
            where: { id }
        });
        return deletedNews;
    } catch (error) {
        return error.message || "News could not be deleted";
    }
};

module.exports = {
    getAllNews,
    getNews,
    createNews,
    updateNews,
    deleteNews
};