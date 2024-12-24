// frontend/src/components/Staff/OrderManagement.js
import React, { useState } from 'react';
import { FaSearch, FaClock, FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import '../../styles/components/Staff/OrderManagement.css';

const OrderManagement = ({ orders, onUpdateStatus }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusInfo = (status) => {
    const statusMap = {
      'pending': {
        label: 'Chờ xử lý',
        icon: <FaClock />,
        className: 'pending'
      },
      'in_progress': {
        label: 'Đang thực hiện',
        icon: <FaSpinner />,
        className: 'in-progress'
      },
      'completed': {
        label: 'Hoàn thành',
        icon: <FaCheckCircle />,
        className: 'completed'
      }
    };
    return statusMap[status] || {
      label: status,
      icon: <FaExclamationCircle />,
      className: 'unknown'
    };
  };

  const filteredOrders = orders.filter(order => 
    order.id.toString().includes(searchTerm) ||
    order.table_id.toString().includes(searchTerm)
  );

  return (
    <div className="order-management-container">
      <div className="order-management-header">
        <h2>Quản lý đơn hàng</h2>
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Tìm kiếm theo ID đơn hàng hoặc số bàn..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="table-container">
        <table className="order-management-table">
          <thead>
            <tr>
              <th>ID đơn hàng</th>
              <th>Bàn số</th>
              <th>Chi tiết đơn hàng</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => {
              const statusInfo = getStatusInfo(order.status);
              return (
                <tr key={order.id} className={`order-row ${statusInfo.className}`}>
                  <td className="order-id">#{order.id}</td>
                  <td className="table-id">
                    <div className="table-badge">
                      Bàn {order.table_id}
                    </div>
                  </td>
                  <td className="order-details">
                    <div className="dishes-list">
                      {order.dishes.map((dish) => (
                        <div key={dish.id} className="dish-item">
                          <span className="dish-name">{dish.name}</span>
                          <span className="dish-quantity">x{dish.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="order-price">
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND'
                    }).format(order.total_price)}
                  </td>
                  <td className="order-status">
                    <span className={`status-badge ${statusInfo.className}`}>
                      {statusInfo.icon}
                      <span>{statusInfo.label}</span>
                    </span>
                  </td>
                  <td className="order-actions">
                    <select
                      value={order.status}
                      onChange={(e) => onUpdateStatus(order.id, e.target.value)}
                      className={`status-select ${statusInfo.className}`}
                    >
                      <option value="pending">Chờ xử lý</option>
                      <option value="in_progress">Đang thực hiện</option>
                      <option value="completed">Hoàn thành</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredOrders.length === 0 && (
        <div className="empty-state">
          <FaExclamationCircle />
          <p>Không tìm thấy đơn hàng nào</p>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;