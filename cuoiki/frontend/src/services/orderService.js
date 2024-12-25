// frontend/src/services/orderService.js
import axios from 'axios';

const API_URL = 'https://order-food-rmd5.onrender.com/api/orders';

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(API_URL, orderData);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo đơn hàng:', error);
    throw error;
  }
};

export const getOrdersByTable = async (tableId) => {
  try {
    const response = await axios.get(`${API_URL}/table/${tableId}?include=dishes`);
    return response.data.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đơn hàng theo bàn:', error);
    return [];
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    await axios.put(`${API_URL}/${orderId}/status`, { status });
  } catch (error) {
    console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error);
    throw error;
  }
};