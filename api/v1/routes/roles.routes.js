const db = require('../../../models');
const { Router } = require('express');
const roleController = require('../../../controllers/roleController');

const router = Router();

router.get("/", roleController.getAllRoles);
router.get('/:roleId', roleController.getRole);
router.post('/', roleController.createRole);
router.put('/:roleId', roleController.updateRole);
router.delete('/:roleId', roleController.deleteRole);

module.exports = router;