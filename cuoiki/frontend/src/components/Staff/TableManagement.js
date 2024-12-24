// frontend/src/components/Staff/TableManagement.js
import React, { useState } from 'react';
import { FaSearch, FaCheckCircle, FaUsers, FaSpinner, FaQrcode } from 'react-icons/fa';
import '../../styles/components/Staff/TableManagement.css';

const TableManagement = ({ tables, onUpdateStatus }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusInfo = (status) => {
    const statusMap = {
      'available': {
        label: 'Trống',
        icon: <FaCheckCircle />,
        className: 'available'
      },
      'occupied': {
        label: 'Có khách',
        icon: <FaUsers />,
        className: 'occupied'
      },
      'in_progress': {
        label: 'Đang phục vụ',
        icon: <FaSpinner />,
        className: 'in-progress'
      }
    };
    return statusMap[status] || {
      label: status,
      icon: null,
      className: ''
    };
  };

  const filteredTables = tables.filter(table =>
    table.id.toString().includes(searchTerm)
  );

  return (
    <div className="table-management-container">
      <div className="table-management-header">
        <h2>Quản lý bàn</h2>
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Tìm kiếm theo số bàn..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="tables-grid">
        {filteredTables.map((table) => {
          const statusInfo = getStatusInfo(table.status);
          return (
            <div key={table.id} className={`table-card ${statusInfo.className}`}>
              <div className="table-header">
                <h3>Bàn {table.id}</h3>
                <FaQrcode className="qr-icon" />
              </div>
              
              <div className="table-status">
                <span className={`status-badge ${statusInfo.className}`}>
                  {statusInfo.icon}
                  <span>{statusInfo.label}</span>
                </span>
              </div>

              <div className="table-actions">
                <select
                  value={table.status}
                  onChange={(e) => onUpdateStatus(table.id, e.target.value)}
                  className={`status-select ${statusInfo.className}`}
                >
                  <option value="available">Trống</option>
                  <option value="occupied">Có khách</option>
                  <option value="in_progress">Đang phục vụ</option>
                </select>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTables.length === 0 && (
        <div className="empty-state">
          <FaUsers />
          <p>Không tìm thấy bàn nào</p>
        </div>
      )}
    </div>
  );
};

export default TableManagement;