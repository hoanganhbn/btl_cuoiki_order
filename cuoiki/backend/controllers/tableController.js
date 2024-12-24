// backend/controllers/tableController.js
const Table = require('../models/Table');

const tableController = {
  // Lấy danh sách bàn
  getAllTables: async (req, res) => {
    try {
      const tables = await Table.getAll();
      res.json({ success: true, data: tables });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Lỗi khi lấy danh sách bàn' });
    }
  },

  // Lấy bàn theo ID
  getTableById: async (req, res) => {
    try {
      const { tableId } = req.params;
      const table = await Table.getById(tableId);
      if (table) {
        res.json({ success: true, data: table });
      } else {
        res.status(404).json({ success: false, error: 'Không tìm thấy bàn' });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: 'Lỗi khi lấy thông tin bàn' });
    }
  },

  // Cập nhật trạng thái bàn
  updateTableStatus: async (req, res) => {
    try {
      const { tableId } = req.params;
      const { status } = req.body;
      const updated = await Table.updateStatus(tableId, status);
      if (updated) {
        res.json({ success: true, message: 'Trạng thái bàn đã được cập nhật' });
      } else {
        res.status(404).json({ success: false, error: 'Không tìm thấy bàn' });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: 'Lỗi khi cập nhật trạng thái bàn' });
    }
  },
};

module.exports = tableController;