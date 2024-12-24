// backend/controllers/orderController.js

const Order = require('../models/Order');
const Table = require('../models/Table');

const orderController = {
  // Tạo đơn hàng mới
  createOrder: async (req, res) => {
    try {
      const { table_id, total_price, dishes } = req.body;

      // Tạo đơn hàng
      const order_id = await Order.create({ table_id, total_price, status: 'pending' });

      // Thêm chi tiết đơn hàng
      for (const { dish_id, quantity } of dishes) {
        await Order.addOrderDetail(order_id, dish_id, quantity);
      }

      // Cập nhật trạng thái bàn
      await Table.updateStatus(table_id, 'occupied');

      // Lấy thông tin đơn hàng vừa tạo
      const orderDetails = await Order.getById(order_id);

      // Trả về response với đầy đủ thông tin
      res.status(201).json({
        success: true,
        message: 'Đơn hàng đã được tạo thành công',
        data: {
          order_id: order_id,
          table_id: table_id,
          total_price: total_price,
          created_at: orderDetails.created_at,
          status: 'pending'
        }
      });
    } catch (error) {
      console.error('Lỗi khi tạo đơn hàng:', error);
      res.status(500).json({ success: false, error: 'Lỗi khi tạo đơn hàng' });
    }
  },

  // Lấy danh sách đơn hàng theo bàn
  getOrdersByTable: async (req, res) => {
    try {
      const { tableId } = req.params;
      const { include } = req.query;
      const orders = await Order.getByTableId(tableId);
      if (include === 'dishes') {
        for (const order of orders) {
          order.dishes = await Order.getDishesForOrder(order.id);
        }
      }
      res.json({ success: true, data: orders });
    } catch (error) {
      console.error('Lỗi khi lấy danh sách đơn hàng:', error);
      res.status(500).json({ success: false, error: 'Lỗi khi lấy danh sách đơn hàng' });
    }
  },

  // Cập nhật trạng thái đơn hàng
  updateOrderStatus: async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const updated = await Order.updateStatus(orderId, status);
      if (updated) {
        res.json({ success: true, message: 'Trạng thái đơn hàng đã được cập nhật' });
      } else {
        res.status(404).json({ success: false, error: 'Không tìm thấy đơn hàng' });
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error);
      res.status(500).json({ success: false, error: 'Lỗi khi cập nhật trạng thái đơn hàng' });
    }
  },
};

module.exports = orderController;