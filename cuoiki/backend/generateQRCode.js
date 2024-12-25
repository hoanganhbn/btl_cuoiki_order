// backend/generateQRCode.js
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Hàm lưu ảnh QR từ base64 thành file
const saveQRCode = (base64Data, fileName) => {
  const base64Image = base64Data.split(';base64,').pop();
  const qrCodeDir = path.join(__dirname, 'img-qrcode'); // Đường dẫn đến thư mục img-qrcode
  const filePath = path.join(qrCodeDir, fileName); // Đường dẫn đầy đủ đến file

  // Kiểm tra và tạo thư mục img-qrcode nếu chưa tồn tại
  if (!fs.existsSync(qrCodeDir)) {
    fs.mkdirSync(qrCodeDir);
  }

  fs.writeFile(filePath, base64Image, { encoding: 'base64' }, (err) => {
    if (err) {
      console.error(`Lỗi khi lưu ảnh QR cho ${fileName}:`, err);
    } else {
      console.log(`Ảnh QR cho ${fileName} đã được lưu thành công tại ${filePath}`);
    }
  });
};

// Hàm tạo mã QR cho tất cả các bàn
const generateQRCodesForAllTables = async () => {
  try {
    // Lấy danh sách tất cả các bàn
    const tablesResponse = await axios.get('https://btl-cuoiki-order.onrender.com/api/tables');
    const tables = tablesResponse.data.data;

    // Lặp qua từng bàn và tạo mã QR
    for (const table of tables) {
      const qrResponse = await axios.get(`https://btl-cuoiki-order.onrender.com/api/qr/${table.id}`);
      const qrCodeImage = qrResponse.data.qrCodeImage;
      const fileName = `table${table.id}_qr.png`;
      saveQRCode(qrCodeImage, fileName);
    }
  } catch (error) {
    console.error('Lỗi khi tạo mã QR cho các bàn:', error);
  }
};

// Chạy script
generateQRCodesForAllTables();