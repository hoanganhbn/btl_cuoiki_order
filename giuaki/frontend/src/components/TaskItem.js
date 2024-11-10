// TaskItem.js
import React, { useState } from 'react';
import { deleteTask, toggleCompleteTask } from '../api';

const TaskItem = ({ task, refreshTasks }) => {
    const [completed, setCompleted] = useState(task.completed);

    const handleCompleteToggle = async () => {
        const updatedTask = await toggleCompleteTask(task.id, !completed);
        if (updatedTask) {
            setCompleted(!completed);
            refreshTasks();
        }
    };

    const handleDelete = async () => {
        const success = await deleteTask(task.id);
        if (success) {
            refreshTasks();
        }
    };

    return (
        <div className={`task-item ${completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={completed}
                onChange={handleCompleteToggle}
            />
            <div className="task-info">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p><small>Hạn cuối: {task.due_date}</small></p>
            </div>
            <div className="task-actions">
                <button onClick={handleCompleteToggle} className="complete-button">
                    {completed ? 'Đã hoàn thành' : 'Hoàn thành'}
                </button>
                <button onClick={handleDelete} className="delete-button">Xóa</button>
            </div>
        </div>
    );
};

export default TaskItem;
