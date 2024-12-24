// frontend/src/services/tableService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tables';

export const getAllTables = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách bàn:', error);
    return [];
  }
};

export const updateTableStatus = async (tableId, status) => {
  try {
    await axios.put(`${API_URL}/${tableId}/status`, { status });
  } catch (error) {
    console.error('Lỗi khi cập nhật trạng thái bàn:', error);
    throw error;
  }
};