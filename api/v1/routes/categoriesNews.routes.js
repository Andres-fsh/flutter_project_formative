const db = require('../../../models');
const { Router } = require('express');
const categoriesNewsController = require('../../../controllers/categoriesNewsController');

const router = Router();

router.get("/", categoriesNewsController.getAllCategoriesNews);
router.get('/:categoriesNewsId', categoriesNewsController.getCategoryNews);
router.post('/', categoriesNewsController.createCategoryNews);
router.put('/:categoriesNewsId', categoriesNewsController.updateCategoryNews);
router.delete('/:categoriesNewsId', categoriesNewsController.deleteCategoryNews);

module.exports = router;