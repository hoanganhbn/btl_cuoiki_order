// backend/routes/tableRoutes.js
const express = require('express');
const tableController = require('../controllers/tableController');

const router = express.Router();

// Lấy danh sách bàn
router.get('/', tableController.getAllTables);

// Lấy bàn theo ID
router.get('/:tableId', tableController.getTableById);

// Cập nhật trạng thái bàn
router.put('/:tableId/status', tableController.updateTableStatus);

module.exports = router;