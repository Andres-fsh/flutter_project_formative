const db = require('../../../models');
const { Router } = require('express');
const projectsMonitoringController = require('../../../controllers/projectsMonitoringController');

const router = Router();

router.get("/", projectsMonitoringController.getAllProjectsMonitoring);
router.get('/:projectsMonitoringId', projectsMonitoringController.getProjectsMonitoring);
router.post('/', projectsMonitoringController.createProjectsMonitoring);
router.put('/:projectsMonitoringId', projectsMonitoringController.updateProjectsMonitoring);
router.delete('/:projectsMonitoringId', projectsMonitoringController.deleteProjectsMonitoring);

module.exports = router;