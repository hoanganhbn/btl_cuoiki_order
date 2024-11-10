const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController'); // Import controller xử lý tasks

// Định nghĩa các route cho tasks
router.get('/tasks', taskController.getTasks); // Lấy tất cả tasks
router.post('/tasks', taskController.createTask); // Thêm task mới
router.put('/tasks/:id/complete', taskController.toggleCompleteTask); // Cập nhật trạng thái hoàn thành của task
router.put('/tasks/:id', taskController.editTask); // Cập nhật thông tin task
router.delete('/tasks/:id', taskController.removeTask); // Xóa task

module.exports = router;
