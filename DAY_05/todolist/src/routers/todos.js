const express = require('express');
const router = express.Router();
const connection = require('../configs/database');

// Lấy tất cả todos
router.get('/', (req, res) => {
    connection.query('SELECT * FROM todos', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Tạo một todo mới
router.post('/', (req, res) => {
    const { title, description, due_date } = req.body;
    const query = 'INSERT INTO todos (title, description, due_date) VALUES (?, ?, ?)';
    connection.query(query, [title, description, due_date], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: result.insertId, title, description, due_date });
    });
});

// Cập nhật todo
router.put('/:id', (req, res) => {
    const { title, description, due_date, completed } = req.body;
    const query = 'UPDATE todos SET title = ?, description = ?, due_date = ?, completed = ? WHERE id = ?';
    connection.query(query, [title, description, due_date, completed, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Todo updated successfully' });
    });
});

// Xóa todo
router.delete('/:id', (req, res) => {
    const query = 'DELETE FROM todos WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Todo deleted successfully' });
    });
});

module.exports = router;
