const express = require('express');
const router = express.Router();
const authController = require('../../../controllers/authController');
const { verifyToken } = require('../../../middleware/authMiddleware');

// Endpoints (por ahora solo devuelven 501 para validar el cableado)
router.post('/login', authController.login);
router.get('/verify', authController.verifyTokenController);
router.get('/authenticated', verifyToken, authController.getUserAuthenticated);

module.exports = router;