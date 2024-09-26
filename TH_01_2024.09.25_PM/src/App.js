import React, { useState } from 'react';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import './assets/styles.css';

const App = () => {
    const [tasks, setTasks] = useState([
        { text: 'Học lập trình web với React', isCompleted: false, dateText: 'Tomorrow', dateClass: 'tomorrow' },
        { text: 'Gửi email nộp bài tập về nhà', isCompleted: false, dateText: 'Saturday', dateClass: 'saturday' },
        { text: 'Học từ vựng tiếng anh mỗi ngày', isCompleted: false, dateText: 'Monday', dateClass: 'monday' },
        { text: 'Viết tiểu luận môn Triết học', isCompleted: false, dateText: 'Today', dateClass: 'today' },
    ]);

    const addTask = (text) => {
        const newTasks = [...tasks, { text, isCompleted: false, dateText: 'Today', dateClass: 'today' }];
        setTasks(newTasks);
    };

    const completeTask = (index) => {
        const newTasks = [...tasks];
        newTasks[index].isCompleted = !newTasks[index].isCompleted;
        setTasks(newTasks);
    };

    const removeTask = (index) => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    return (
        <div className="app">
            <h1>My work <span role="img" aria-label="target">🎯</span></h1>
            <TaskList tasks={tasks} completeTask={completeTask} removeTask={removeTask} />
            <AddTask addTask={addTask} /> {/* Form để thêm nhiệm vụ */}
        </div>
    );
};

export default App;
