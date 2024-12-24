// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Customer from './pages/Customer';
import Staff from './pages/Staff';
import Login from './pages/Login';

// Protected Route Component - Kiểm tra xác thực trước khi cho phép truy cập vào trang Staff
const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('staffToken');
    
    if (!isAuthenticated) {
        // Nếu chưa đăng nhập, chuyển hướng về trang login
        return <Navigate to="/login" replace />;
    }

    // Nếu đã đăng nhập, cho phép truy cập component con
    return children;
};

function App() {
    return (
        <Router>
            <Routes>
                {/* Route công khai - ai cũng có thể truy cập */}
                <Route path="/" element={<Home />} />
                <Route path="/customer" element={<Customer />} />
                <Route path="/login" element={<Login />} />

                {/* Route được bảo vệ - cần đăng nhập mới có thể truy cập */}
                <Route 
                    path="/staff" 
                    element={
                        <ProtectedRoute>
                            <Staff />
                        </ProtectedRoute>
                    } 
                />

                {/* Có thể thêm route để xử lý trường hợp không tìm thấy trang */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;