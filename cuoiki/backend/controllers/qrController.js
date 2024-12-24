// backend/controllers/qrController.js
const QRCode = require('qrcode');
const Table = require('../models/Table');

const qrController = {
  generateQRCode: async (req, res) => {
    try {
      const { tableId } = req.params;
      const table = await Table.getById(tableId);
      if (!table) {
        return res.status(404).json({ success: false, error: 'Không tìm thấy bàn' });
      }

      // Sử dụng localhost thay vì địa chỉ IP
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      const qrCodeUrl = `${frontendUrl}/customer?tableId=${tableId}`;
      const qrCodeImage = await QRCode.toDataURL(qrCodeUrl);

      // Cập nhật URL mã QR vào bảng tables
      await Table.updateQRCodeUrl(tableId, qrCodeUrl);

      res.json({ success: true, qrCodeImage, qrCodeUrl });
    } catch (error) {
      console.error('Error in generateQRCode:', error);
      res.status(500).json({ success: false, error: 'Lỗi khi tạo mã QR' });
    }
  },
};

module.exports = qrController;