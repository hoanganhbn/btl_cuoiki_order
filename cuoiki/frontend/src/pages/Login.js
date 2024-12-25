// frontend/src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaMugHot } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/pages/Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Gọi API thật đến backend (thay đổi URL nếu khác)
            const response = await fetch('https://order-food-rmd5.onrender.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            const data = await response.json();

            if (data.success) {
                // Đăng nhập thành công
                localStorage.setItem('staffToken', 'simple-token');
                toast.success('Đăng nhập thành công!');
                setTimeout(() => {
                    navigate('/staff');
                }, 1500);
            } else {
                // Sai tài khoản hoặc mật khẩu
                toast.error(data.message || 'Tên đăng nhập hoặc mật khẩu không đúng!');
            }
        } catch (error) {
            // Lỗi kết nối hoặc lỗi server
            toast.error('Đã có lỗi xảy ra khi đăng nhập!');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <FaMugHot className="logo-icon" />
                    <h1>Chè Xưa và Nay</h1>
                    <p>Đăng nhập dành cho nhân viên</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <div className="input-icon">
                            <FaUser />
                        </div>
                        <input
                            type="text"
                            name="username"
                            placeholder="Tên đăng nhập"
                            value={credentials.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <div className="input-icon">
                            <FaLock />
                        </div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Mật khẩu"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className={`login-button ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                    </button>

                    <div className="form-footer">
                        <a href="/">Quay về trang chủ</a>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;