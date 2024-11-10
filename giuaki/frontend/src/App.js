import React, { useState, useEffect } from 'react';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import { getTasks } from './api';
import "./css/app.css"; // Nếu App.css nằm trong thư mục con 'css'

const App = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const fetchedTasks = await getTasks();
            setTasks(fetchedTasks);
        };
        fetchTasks();
    }, []);

    const refreshTasks = async () => {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
    };

    return (
        <div className="app">
            <header className="app-header">
                <h1 className="app-title">My Work</h1>
            </header>
            <main className="main-content">
                <AddTaskForm refreshTasks={refreshTasks} />
                <TaskList tasks={tasks} refreshTasks={refreshTasks} />
            </main>
        </div>
    );
};

export default App;
