const db = require('../../../models');
const { Router } = require('express');
const satisfactionSurveyController = require('../../../controllers/satisfactionSurveyController');

const router = Router();

router.get("/", satisfactionSurveyController.getAllSatisfactionSurveys);
router.get('/:satisfactionSurveyId', satisfactionSurveyController.getSatisfactionSurvey);
router.post('/', satisfactionSurveyController.createSatisfactionSurvey);
router.put('/:satisfactionSurveyId', satisfactionSurveyController.updateSatisfactionSurvey);
router.delete('/:satisfactionSurveyId', satisfactionSurveyController.deleteSatisfactionSurvey);

module.exports = router;