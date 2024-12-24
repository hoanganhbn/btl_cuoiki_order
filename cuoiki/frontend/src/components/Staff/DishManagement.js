// frontend/src/components/Staff/DishManagement.js
import React, { useState } from 'react';
import { FaSearch, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import '../../styles/components/Staff/DishManagement.css';

const DishManagement = ({ dishes, onUpdateAvailability }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDishes = dishes.filter(dish =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dish-management-container">
      <div className="dish-management-header">
        <h2>Quản lý món ăn</h2>
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Tìm kiếm món ăn..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="table-container">
        <table className="dish-management-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên món</th>
              <th>Giá</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredDishes.map((dish) => (
              <tr key={dish.id}>
                <td>#{dish.id}</td>
                <td>
                  <div className="dish-name">
                    {dish.image && (
                      <img 
                        src={dish.image} 
                        alt={dish.name} 
                        className="dish-thumbnail"
                      />
                    )}
                    <span>{dish.name}</span>
                  </div>
                </td>
                <td>
                  <span className="price-tag">
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND'
                    }).format(dish.price)}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${dish.available ? 'available' : 'unavailable'}`}>
                    {dish.available ? (
                      <><FaCheckCircle /> Còn hàng</>
                    ) : (
                      <><FaTimesCircle /> Hết hàng</>
                    )}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => onUpdateAvailability(dish.id, !dish.available)}
                    className={`action-button ${dish.available ? 'mark-unavailable' : 'mark-available'}`}
                  >
                    {dish.available ? 'Đánh dấu hết hàng' : 'Đánh dấu còn hàng'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DishManagement;