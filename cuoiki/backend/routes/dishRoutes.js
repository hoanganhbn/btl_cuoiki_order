// backend/routes/dishRoutes.js

const express = require('express');
const dishController = require('../controllers/dishController');

const router = express.Router();

// Lấy danh sách món ăn
router.get('/', dishController.getAllDishes);

// Cập nhật trạng thái món ăn
router.put('/:dishId/availability', dishController.updateDishAvailability);

module.exports = router;