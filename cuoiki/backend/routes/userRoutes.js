// backend/routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// POST /api/login
router.post('/login', userController.login);

module.exports = router;