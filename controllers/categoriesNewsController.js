const categoriesNewsService = require('../services/categoriesNewsService');

const getAllCategoriesNews = async (req, res) => {
    const allCategoriesNews = await categoriesNewsService.getAllCategoriesNews();
    if(allCategoriesNews)
        res.status(200).send({ status: "OK", data: allCategoriesNews });
    else
        res.status(400).send({ status: "FAILED", data: allCategoriesNews });
};

const getCategoryNews = async (req, res) => {
    let id = req.params.categoriesNewsId;
    const categoryNews = await categoriesNewsService.getCategoryNews(id);
    if(categoryNews)
        res.status(200).send({ status: "OK", data: categoryNews });
    else
        res.status(400).send({ status: "FAILED", data: categoryNews });
};

const createCategoryNews = async (req, res) => {
    const { body } = req;
    const createdCategoryNews = await categoriesNewsService.createCategoryNews(body.name, body.description);
    if(createdCategoryNews)
        res.status(201).send({ status: "OK", data: createdCategoryNews });
    else
        res.status(400).send({ status: "FAILED", data: createdCategoryNews });
};

const updateCategoryNews = async (req, res) => {
    let id = req.params.categoriesNewsId;
    let { name, description } = req.body;
    const updatedCategoryNews = await categoriesNewsService.updateCategoryNews(id, name, description);
    if(updatedCategoryNews)
        res.status(200).send({ status: "OK", data: updatedCategoryNews });
    else
        res.status(400).send({ status: "FAILED", data: updatedCategoryNews });
};

const deleteCategoryNews = async (req, res) => {
    let id = req.params.categoriesNewsId;
    const deletedCategoryNews = await categoriesNewsService.deleteCategoryNews(id);
    if (deletedCategoryNews)
        res.status(200).send({ status: "OK", data: deletedCategoryNews });
    else
        res.status(400).send({ status: "FAILED", data: deletedCategoryNews });
};

module.exports = {
    getAllCategoriesNews,
    getCategoryNews,
    createCategoryNews,
    updateCategoryNews,
    deleteCategoryNews
};