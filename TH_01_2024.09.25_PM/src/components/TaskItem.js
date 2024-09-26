import React from 'react';

const TaskItem = ({ task, index, completeTask, removeTask }) => {
    return (
        <div className="task">
            <div className="task-content">
                <input
                    type="radio"
                    checked={task.isCompleted}
                    onChange={() => completeTask(index)}
                    className={`radio-button ${task.dateClass}`}
                />
                <div>
                    <span className={task.isCompleted ? 'completed' : ''}>{task.text}</span>
                    <div className={`task-date ${task.dateClass}`}>
                        {task.dateText}
                    </div>
                </div>
            </div>
            <button className="delete-button" onClick={() => removeTask(index)}>X</button>
        </div>
    );
};

export default TaskItem;
