const db = require('../models');

const getAllCategoriesNews = async () => {
    try {
        let categoriesNews = await db.CategoriesNews.findAll();
        return categoriesNews;
    } catch (error) {
        return error.message || "Failed to get categories news";
    }
};

const getCategoryNews = async (id) => {
    try {
        let categoryNews = await db.CategoriesNews.findByPk(id);
        return categoryNews;
    } catch (error) {
        return error.message || "Failed to get category news";
    }
};

const createCategoryNews = async (name, description) => {
    try {
        let newCategoryNews = await db.CategoriesNews.create({
            name,
            description
        });
        return newCategoryNews;
    } catch (error) {
        return error.message || "Category news could not be created";
    }
};

const updateCategoryNews = async (id, name, description) => {
    try {
        let updatedCategoryNews = await db.CategoriesNews.update({
            name,
            description
        }, {
            where: {
                id,
            }
        });
        return updatedCategoryNews;
    } catch (error) {
        return error.message || "Category news could not be updated";
    }
};

const deleteCategoryNews = async (id) => {
    try {
        const deletedCategoryNews = await db.CategoriesNews.destroy({
            where: {
                id,
            }
        });
        return deletedCategoryNews;
    } catch (error) {
        return error.message || "Category news could not be deleted";
    }
};

module.exports = {
    getAllCategoriesNews,
    getCategoryNews,
    createCategoryNews,
    updateCategoryNews,
    deleteCategoryNews,
};