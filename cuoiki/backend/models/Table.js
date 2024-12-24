// backend/models/Table.js
const db = require('../configs/db');

const Table = {
  // Lấy danh sách bàn
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM tables');
    return rows;
  },

  // Lấy bàn theo ID
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM tables WHERE id = ?', [id]);
    return rows[0];
  },

  // Cập nhật trạng thái bàn
  updateStatus: async (id, status) => {
    const [result] = await db.query('UPDATE tables SET status = ? WHERE id = ?', [status, id]);
    return result.affectedRows > 0;
  },

  // Cập nhật URL mã QR của bàn
  updateQRCodeUrl: async (id, qrCodeUrl) => {
    const [result] = await db.query('UPDATE tables SET qr_code_url = ? WHERE id = ?', [qrCodeUrl, id]);
    return result.affectedRows > 0;
  },
};

module.exports = Table;