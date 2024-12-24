// backend/routes/qrRoutes.js
const express = require('express');
const qrController = require('../controllers/qrController');

const router = express.Router();

// Tạo mã QR cho bàn
router.get('/:tableId', qrController.generateQRCode);

module.exports = router;