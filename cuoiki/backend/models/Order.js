// backend/models/Order.js

const db = require('../configs/db');

const Order = {
  getById: async (orderId) => {
    const [rows] = await db.query('SELECT * FROM orders WHERE id = ?', [orderId]);
    return rows[0];
  },
  
  // Tạo đơn hàng mới
  create: async (orderData) => {
    const { table_id, total_price, status } = orderData;
    const [result] = await db.query(
      'INSERT INTO orders (table_id, total_price, status) VALUES (?, ?, ?)',
      [table_id, total_price, status]
    );
    return result.insertId;
  },

  // Lấy danh sách đơn hàng theo bàn
  getByTableId: async (tableId) => {
    const [rows] = await db.query('SELECT * FROM orders WHERE table_id = ?', [tableId]);
    return rows;
  },

  // Cập nhật trạng thái đơn hàng
  updateStatus: async (orderId, status) => {
    const [result] = await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, orderId]);
    return result.affectedRows > 0;
  },

  // Thêm chi tiết đơn hàng
  addOrderDetail: async (orderId, dishId, quantity) => {
    // Lấy giá của món ăn từ bảng dishes
    const [dishResult] = await db.query('SELECT price FROM dishes WHERE id = ?', [dishId]);
    if (!dishResult[0]) {
      throw new Error('Món ăn không tồn tại');
    }
    const { price } = dishResult[0];

    // Tính sub_total
    const subTotal = price * quantity;

    // Thêm chi tiết đơn hàng vào bảng order_details
    const [result] = await db.query(
      'INSERT INTO order_details (order_id, dish_id, quantity, sub_total) VALUES (?, ?, ?, ?)',
      [orderId, dishId, quantity, subTotal]
    );
    return result.insertId;
  },

  // Lấy danh sách món ăn của một đơn hàng
  getDishesForOrder: async (orderId) => {
    const [rows] = await db.query(`
      SELECT dishes.id, dishes.name, dishes.price, order_details.quantity
      FROM order_details
      JOIN dishes ON order_details.dish_id = dishes.id
      WHERE order_details.order_id = ?
    `, [orderId]);
    return rows;
  },
};

module.exports = Order;