import React, { useState } from 'react';
import { addTask } from '../api';

const AddTaskForm = ({ refreshTasks }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = { title, description, due_date: dueDate };
        const task = await addTask(newTask);
        if (task) {
            refreshTasks();
            setTitle('');
            setDescription('');
            setDueDate('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-task-form">
            <input
                type="text"
                placeholder="Tiêu đề"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="task-input"
                required
            />
            <textarea
                placeholder="Mô tả"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="task-input"
            ></textarea>
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="task-input"
            />
            <button type="submit" className="btn-submit">Thêm công việc</button>
        </form>
    );
};

export default AddTaskForm;
