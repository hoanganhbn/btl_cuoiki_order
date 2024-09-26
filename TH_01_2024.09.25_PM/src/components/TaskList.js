import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, completeTask, removeTask }) => {
    return (
        <div className="task-list">
            {tasks.map((task, index) => (
                <TaskItem
                    key={index}
                    index={index}
                    task={task}
                    completeTask={completeTask}
                    removeTask={removeTask}
                />
            ))}
        </div>
    );
};

export default TaskList;
