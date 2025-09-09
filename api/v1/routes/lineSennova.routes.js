const db = require('../../../models');
const { Router } = require('express');
const lineSennovaController = require('../../../controllers/lineSennovaController');


const router = Router();

router.get("/", lineSennovaController.getAllLinesSennova);
router.get('/:lineSennovaId', lineSennovaController.getLineSennova);
router.post('/', lineSennovaController.createLineSennova);
router.put('/:lineSennovaId', lineSennovaController.updateLineSennova);
router.delete('/:lineSennovaId', lineSennovaController.deleteLineSennova);

module.exports = router;