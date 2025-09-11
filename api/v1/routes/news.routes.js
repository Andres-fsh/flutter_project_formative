const db = require('../../../models');
const { Router } = require('express');
const newsController = require('../../../controllers/newsController');

const router = Router();

router.get("/", newsController.getAllNews);
router.get('/:newsId', newsController.getNews);
router.post('/', newsController.createNews);
router.put('/:newsId', newsController.updateNews);
router.delete('/:newsId', newsController.deleteNews);

module.exports = router;