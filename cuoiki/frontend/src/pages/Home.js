// frontend/src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaStore, FaUserCog, FaMugHot, FaLeaf } from 'react-icons/fa';
import '../styles/pages/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <FaLeaf className="leaf-icon" />
        <h1 className="main-title">Chè Xưa và Nay</h1>
        <p className="subtitle">Hương vị ngọt ngào - Đậm đà truyền thống</p>
      </div>

      <div className="feature-section">
        <div className="feature-item">
          <FaMugHot className="feature-icon" />
          <p>Hơn 30 món chè truyền thống</p>
        </div>
        <div className="feature-item">
          <FaLeaf className="feature-icon" />
          <p>Nguyên liệu tự nhiên</p>
        </div>
      </div>

      <div className="home-buttons">
        <Link to="/customer" className="home-button customer">
          <FaStore className="button-icon" />
          <span>Đặt món ngay</span>
        </Link>
        <Link to="/login" className="home-button staff"> 
          <FaUserCog className="button-icon" />
          <span>Đăng nhập nhân viên</span>
        </Link>
      </div>
    </div>
  );
};

export default Home;