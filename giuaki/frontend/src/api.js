import axios from 'axios';

const API_URL = 'http://localhost:3001/api'; // URL backend

// Lấy tất cả tasks
export const getTasks = async () => {
    try {
        const response = await axios.get(`${API_URL}/tasks`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy công việc:', error);
        return [];
    }
};

// Thêm mới task
export const addTask = async (task) => {
    try {
        const response = await axios.post(`${API_URL}/tasks`, task);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi thêm công việc:', error);
        return null;
    }
};

// Cập nhật task
export const updateTask = async (id, task) => {
    try {
        const response = await axios.put(`${API_URL}/tasks/${id}`, task);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi cập nhật công việc:', error);
        return null;
    }
};

// Xoá task
export const deleteTask = async (id) => {
    try {
        await axios.delete(`${API_URL}/tasks/${id}`);
        return true;
    } catch (error) {
        console.error('Lỗi khi xoá công việc:', error);
        return false;
    }
};

// Hàm toggle trạng thái hoàn thành task
export const toggleCompleteTask = async (id, completed) => {
    try {
        const response = await axios.put(`${API_URL}/tasks/${id}/complete`, { completed });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái hoàn thành công việc:', error);
        return null;
    }
};
