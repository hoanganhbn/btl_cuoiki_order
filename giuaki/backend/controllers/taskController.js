const taskModel = require('../models/taskModel'); // Import model xử lý database

// Lấy tất cả tasks
const getTasks = (req, res) => {
    taskModel.getAllTasks((err, tasks) => {
        if (err) {
            res.status(500).json({ error: 'Không thể lấy danh sách công việc' });
        } else {
            res.status(200).json(tasks);
        }
    });
};

// Thêm task mới
const createTask = (req, res) => {
    const { title, description, due_date } = req.body;
    taskModel.addTask(title, description, due_date, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Không thể thêm công việc' });
        } else {
            res.status(201).json({ id: result.insertId, title, description, due_date, completed: false });
        }
    });
};

// Cập nhật task
const editTask = (req, res) => {
    const { id } = req.params;
    const { title, description, due_date, completed } = req.body;
    taskModel.updateTask(id, title, description, due_date, completed, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Không thể cập nhật công việc' });
        } else {
            res.status(200).json({ id, title, description, due_date, completed });
        }
    });
};

// Xoá task
const removeTask = (req, res) => {
    const { id } = req.params;
    taskModel.deleteTask(id, (err) => {
        if (err) {
            res.status(500).json({ error: 'Không thể xoá công việc' });
        } else {
            res.status(200).json({ message: 'Công việc đã được xoá thành công' });
        }
    });
};

// Cập nhật trạng thái hoàn thành
const toggleCompleteTask = (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    taskModel.toggleCompleteTask(id, completed, (err) => {
        if (err) {
            res.status(500).json({ error: 'Không thể cập nhật trạng thái hoàn thành' });
        } else {
            res.status(200).json({ id, completed });
        }
    });
};

module.exports = {
    getTasks,
    createTask,
    editTask,
    removeTask,
    toggleCompleteTask
};
