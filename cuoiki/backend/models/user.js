// backend/models/user.js
const db = require('../configs/db');

const user = {
  // Lấy user theo username
  getByUsername: async (username) => {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    return rows[0]; // nếu không có, rows[0] = undefined
  },
};

module.exports = user;