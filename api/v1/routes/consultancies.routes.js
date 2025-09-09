const db = require('../../../models');
const { Router } = require('express');
const consultancyController = require('../../../controllers/consultancyController');

const router = Router();

router.get("/", consultancyController.getAllConsultancies);
router.get('/:consultancyId', consultancyController.getConsultancy);
router.post('/', consultancyController.createConsultancy);
router.put('/:consultancyId', consultancyController.updateConsultancy);
router.delete('/:consultancyId', consultancyController.deleteConsultancy);

module.exports = router;