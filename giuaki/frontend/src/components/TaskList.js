import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, refreshTasks }) => {
    return (
        <div className="task-list">
            {tasks.map(task => (
                <TaskItem key={task.id} task={task} refreshTasks={refreshTasks} />
            ))}
        </div>
    );
};

export default TaskList;
