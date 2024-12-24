// backend/routes/orderRoutes.js
const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

// Tạo đơn hàng mới
router.post('/', orderController.createOrder);

// Lấy danh sách đơn hàng theo bàn
router.get('/table/:tableId', orderController.getOrdersByTable);

// Cập nhật trạng thái đơn hàng
router.put('/:orderId/status', orderController.updateOrderStatus);

module.exports = router;