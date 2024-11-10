const mysql = require('mysql');
const db = require('../configs/dbConfig'); // Kết nối với MySQL

// Lấy tất cả tasks
const getAllTasks = (callback) => {
    db.query('SELECT * FROM tasks', callback);
};

// Thêm task mới
const addTask = (title, description, due_date, callback) => {
    const query = 'INSERT INTO tasks (title, description, due_date, completed) VALUES (?, ?, ?, ?)';
    db.query(query, [title, description, due_date, 0], callback); // Mặc định completed là 0 (chưa hoàn thành)
};

// Cập nhật task
const updateTask = (id, title, description, due_date, completed, callback) => {
    const query = 'UPDATE tasks SET title = ?, description = ?, due_date = ?, completed = ? WHERE id = ?';
    db.query(query, [title, description, due_date, completed, id], callback);
};

// Xoá task
const deleteTask = (id, callback) => {
    const query = 'DELETE FROM tasks WHERE id = ?';
    db.query(query, [id], callback);
};

// Cập nhật trạng thái hoàn thành của task
const toggleCompleteTask = (id, completed, callback) => {
    const query = 'UPDATE tasks SET completed = ? WHERE id = ?';
    db.query(query, [completed, id], callback);
};

module.exports = {
    getAllTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleCompleteTask
};
