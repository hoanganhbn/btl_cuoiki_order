// backend/models/Dish.js

const db = require('../configs/db');

const Dish = {
  // Lấy danh sách món ăn
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM dishes');
    return rows;
  },

  // Lấy món ăn theo ID
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM dishes WHERE id = ?', [id]);
    return rows[0];
  },

  // Cập nhật trạng thái món ăn
  updateAvailability: async (id, available) => {
    const [result] = await db.query('UPDATE dishes SET available = ? WHERE id = ?', [available, id]);
    return result.affectedRows > 0;
  },
};

module.exports = Dish;