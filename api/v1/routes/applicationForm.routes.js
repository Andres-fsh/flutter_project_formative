const db = require('../../../models');
const { Router } = require('express');
const applicationFormController = require('../../../controllers/applicationFormController');

const router = Router();

router.get("/", applicationFormController.getAllApplicationForms);
router.get('/:applicationFormId', applicationFormController.getApplicationForm);
router.post('/', applicationFormController.createApplicationForm);
router.put('/:applicationFormId', applicationFormController.updateApplicationForm);
router.delete('/:applicationFormId', applicationFormController.deleteApplicationForm);

module.exports = router;