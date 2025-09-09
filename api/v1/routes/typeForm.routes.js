const { Router } = require('express');
const typeFormController = require('../../../controllers/typeFormController');

const router = Router();

router.get("/", typeFormController.getAllTypeForms);
router.get('/:typeFormId', typeFormController.getTypeForm);
router.post('/', typeFormController.createTypeForm);
router.put('/:typeFormId', typeFormController.updateTypeForm);
router.delete('/:typeFormId', typeFormController.deleteTypeForm);

module.exports = router;