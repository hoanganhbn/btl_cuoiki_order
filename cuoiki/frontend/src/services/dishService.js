// frontend/src/services/dishService.js
import axios from 'axios';

const API_URL = 'https://btl-cuoiki-order.onrender.com/api/dishes';

export const getDishes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách món ăn:', error);
    return [];
  }
};

export const updateDishAvailability = async (dishId, available) => {
  try {
    await axios.put(`${API_URL}/${dishId}/availability`, { available });
  } catch (error) {
    console.error('Lỗi khi cập nhật trạng thái món ăn:', error);
    throw error;
  }
};