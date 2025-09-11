const db = require('../../../models');
const { Router } = require('express');
const informationSennovaController = require('../../../controllers/informationSennovaController');

const router = Router();

router.get("/", informationSennovaController.getAllInformationSennova);
router.get('/:informationSennovaId', informationSennovaController.getInformationSennova);
router.post('/', informationSennovaController.createInformationSennova);
router.put('/:informationSennovaId', informationSennovaController.updateInformationSennova);
router.delete('/:informationSennovaId', informationSennovaController.deleteInformationSennova);

module.exports = router;