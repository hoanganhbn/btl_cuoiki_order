// backend/controllers/userController.js
const user = require('../models/user');

const userController = {
  // Đăng nhập (so sánh username, password)
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Tìm user trong DB
      const foundUser = await user.getByUsername(username);
      if (!foundUser) {
        // Không tìm thấy user trùng tên
        return res.json({
          success: false,
          message: 'Sai tài khoản hoặc mật khẩu!'
        });
      }

      // Kiểm tra password
      if (foundUser.password !== password) {
        return res.json({
          success: false,
          message: 'Sai tài khoản hoặc mật khẩu!'
        });
      }

      // Nếu khớp thì đăng nhập thành công
      return res.json({
        success: true,
        role: foundUser.role
      });

    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error);
      return res.status(500).json({
        success: false,
        message: 'Lỗi server khi đăng nhập'
      });
    }
  }
};

module.exports = userController;