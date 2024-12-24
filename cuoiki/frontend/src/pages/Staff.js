// frontend/src/pages/Staff.js
import React, { useState, useEffect } from 'react';
import OrderManagement from '../components/Staff/OrderManagement';
import TableManagement from '../components/Staff/TableManagement';
import DishManagement from '../components/Staff/DishManagement';
import { getOrdersByTable, updateOrderStatus } from '../services/orderService';
import { getAllTables, updateTableStatus } from '../services/tableService';
import { getDishes, updateDishAvailability } from '../services/dishService';
import { FaClipboardList, FaMugHot, FaChair, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/pages/Staff.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Staff = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [tables, setTables] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (activeTab === 'orders') {
          const tablesData = await getAllTables();
          setTables(tablesData); //Keep tables updated even if not on table tab.
          const ordersData = await Promise.all(
            tablesData.map((table) => getOrdersByTable(table.id))
          );
          setOrders(ordersData.flat());
        } else if (activeTab === 'dishes') {
          const dishesData = await getDishes();
          setDishes(dishesData);
        } else if (activeTab === 'tables') {
          const tablesData = await getAllTables();
          setTables(tablesData);
        }
      } catch (error) {
        toast.error("Lỗi khi tải dữ liệu.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [activeTab]);

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      );
      toast.success("Đã cập nhật trạng thái đơn hàng.");
    } catch (error) {
      toast.error("Lỗi khi cập nhật trạng thái đơn hàng.");
    }
  };

  const handleUpdateTableStatus = async (tableId, status) => {
      try {
        await updateTableStatus(tableId, status);
        setTables((prevTables) =>
          prevTables.map((table) =>
            table.id === tableId ? { ...table, status } : table
          )
        );
        toast.success("Đã cập nhật trạng thái bàn.");
      } catch (error) {
        toast.error("Lỗi khi cập nhật trạng thái bàn.");
      }
    };

  const handleUpdateDishAvailability = async (dishId, available) => {
    try {
      await updateDishAvailability(dishId, available);
      setDishes((prevDishes) =>
        prevDishes.map((dish) =>
          dish.id === dishId ? { ...dish, available } : dish
        )
      );
      toast.success(
        `Đã cập nhật trạng thái của món ăn ${available ? 'Còn hàng' : 'Hết hàng'}`
      );
    } catch (error) {
      toast.error('Lỗi khi cập nhật trạng thái món ăn.');
    }
  };

  return (
    <div className="staff-page">
      <div className="staff-sidebar">
        <div className="sidebar-header">
          <FaMugHot className="logo-icon" />
          <h2>Chè Xưa và Nay</h2>
        </div>
        
        <div className="sidebar-menu">
          <button
            onClick={() => setActiveTab('orders')}
            className={`menu-item ${activeTab === 'orders' ? 'active' : ''}`}
          >
            <FaClipboardList />
            <span>Đơn Hàng</span>
          </button>
          
          <button
            onClick={() => setActiveTab('dishes')}
            className={`menu-item ${activeTab === 'dishes' ? 'active' : ''}`}
          >
            <FaMugHot />
            <span>Món Ăn</span>
          </button>
          
          <button
            onClick={() => setActiveTab('tables')}
            className={`menu-item ${activeTab === 'tables' ? 'active' : ''}`}
          >
            <FaChair />
            <span>Bàn</span>
          </button>
        </div>

        <Link to="/" className="logout-button">
          <FaSignOutAlt />
          <span>Đăng Xuất</span>
        </Link>
      </div>

      <div className="staff-main">
        <div className="main-header">
          <h1>
            {activeTab === 'orders' && 'Quán Chè Ngọc Thạch'}
            {activeTab === 'dishes' && 'Quán Chè Ngọc Thạch'}
            {activeTab === 'tables' && 'Quán Chè Ngọc Thạch'}
          </h1>
        </div>

        <div className="main-content">
          {isLoading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Đang tải dữ liệu...</p>
            </div>
          ) : (
            <>
              {activeTab === 'orders' && (
                <OrderManagement
                  orders={orders}
                  onUpdateStatus={handleUpdateOrderStatus}
                />
              )}
              {activeTab === 'dishes' && (
                <DishManagement
                  dishes={dishes}
                  onUpdateAvailability={handleUpdateDishAvailability}
                />
              )}
              {activeTab === 'tables' && (
                <TableManagement
                  tables={tables}
                  onUpdateStatus={handleUpdateTableStatus}
                />
              )}
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Staff;