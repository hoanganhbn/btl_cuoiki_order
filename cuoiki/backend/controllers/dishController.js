// backend/controllers/dishController.js
const Dish = require('../models/Dish');

const dishController = {
  // Lấy danh sách món ăn
  getAllDishes: async (req, res) => {
    try {
      const dishes = await Dish.getAll();
      res.json({ success: true, data: dishes });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Lỗi khi lấy danh sách món ăn' });
    }
  },

  // Cập nhật trạng thái món ăn
  updateDishAvailability: async (req, res) => {
    try {
      const { dishId } = req.params;
      const { available } = req.body;
      const updated = await Dish.updateAvailability(dishId, available);
      if (updated) {
        res.json({ success: true, message: 'Trạng thái món ăn đã được cập nhật' });
      } else {
        res.status(404).json({ success: false, error: 'Không tìm thấy món ăn' });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: 'Lỗi khi cập nhật trạng thái món ăn' });
    }
  },
};

module.exports = dishController;