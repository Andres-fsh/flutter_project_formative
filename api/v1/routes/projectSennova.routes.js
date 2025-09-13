const db = require('../../../models');
const { Router } = require('express');
const projectSennovaController = require('../../../controllers/projectSennovaController');

const router = Router();

router.get("/", projectSennovaController.getAllProjectsSennova);
router.get('/:projectSennovaId', projectSennovaController.getProjectSennova);
router.post('/', projectSennovaController.createProjectSennova);
router.put('/:projectSennovaId', projectSennovaController.updateProjectSennova);
router.delete('/:projectSennovaId', projectSennovaController.deleteProjectSennova);

module.exports = router;