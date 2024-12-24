// frontend/src/pages/Customer.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Menu from '../components/Customer/Menu';
import OrderSummary from '../components/Customer/OrderSummary';
import Bill from '../components/Customer/Bill';
import { getDishes } from '../services/dishService';
import { createOrder } from '../services/orderService';
import '../styles/pages/Customer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Customer = () => {
    const location = useLocation();
    const [dishes, setDishes] = useState([]);
    const [selectedDishes, setSelectedDishes] = useState([]);
    const [tableId, setTableId] = useState(null);
    const [step, setStep] = useState('menu');
    const [activeCategory, setActiveCategory] = useState('main');
    const [orderInfo, setOrderInfo] = useState(null);

    useEffect(() => {
        const fetchDishes = async () => {
            const data = await getDishes();
            setDishes(data);
        };
        fetchDishes();

        const params = new URLSearchParams(location.search);
        const tableIdFromParams = params.get('tableId');
        if (tableIdFromParams) {
            setTableId(tableIdFromParams);
        }
    }, [location.search]);

    const handleAddToOrder = (dish) => {
        setSelectedDishes((prev) => {
            const existingDish = prev.find((d) => d.id === dish.id);
            if (existingDish) {
                toast.info(`Bạn đã chọn món này rồi`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return prev.map((d) =>
                    d.id === dish.id ? { ...d, quantity: d.quantity + 1 } : d
                );
            } else {
                toast.success(`Đã thêm ${dish.name} vào đơn hàng!`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return [...prev, { ...dish, quantity: 1 }];
            }
        });
    };

    const handleRemoveFromOrder = (dishId) => {
        setSelectedDishes((prev) =>
            prev.filter((d) => d.id !== dishId)
        );
    };

    const handleUpdateQuantity = (dishId, newQuantity) => {
        if (newQuantity >= 1 && newQuantity <= 99) {
            setSelectedDishes(prev =>
                prev.map(dish =>
                    dish.id === dishId
                        ? { ...dish, quantity: newQuantity }
                        : dish
                )
            );
        }
    };

    const handleSubmitOrder = async () => {
        try {
            const totalPrice = selectedDishes.reduce(
                (total, dish) => total + dish.price * dish.quantity,
                0
            );
    
            const orderData = {
                table_id: tableId,
                total_price: totalPrice,
                dishes: selectedDishes.map(({ id, quantity, price }) => ({ 
                    dish_id: id, 
                    quantity,
                    sub_total: price * quantity 
                })),
            };
    
            const response = await createOrder(orderData); // Gọi API
            console.log('Response từ API:', response); // Log dữ liệu trả về
    
            if (response && response.data) {
                setOrderInfo(response.data); // Lưu thông tin đơn hàng vào state
                setStep('bill');
                toast.success('Đặt hàng thành công!');
            } else {
                throw new Error('Dữ liệu trả về không hợp lệ');
            }
        } catch (error) {
            console.error('Lỗi khi gửi đơn hàng:', error);
            toast.error('Có lỗi xảy ra khi gửi đơn hàng. Vui lòng thử lại.');
        }
    };

    const filteredDishes = dishes.filter((dish) =>
        activeCategory === 'main' ? dish.category === 'Món chính' : dish.category === 'Topping'
    );

    return (
        <div className="customer-page">
            <header className="app-header">
                <h1 className="restaurant-name">Quán Chè Ngọc Thạch</h1>
                {tableId && (
                    <div className="table-id-display">
                        <i className="fas fa-table"></i> Bàn số: {tableId}
                    </div>
                )}
            </header>
            {tableId ? (
                <div className="customer-content-wrapper">
                    <header className="customer-header">
                        <nav className="customer-nav">
                            <button
                                onClick={() => setStep('menu')}
                                className={`menu-nav-button ${step === 'menu' ? 'active' : ''}`}
                            >
                                <i className="fas fa-utensils"></i> Menu
                            </button>
                            <button
                                onClick={() => setStep('payment')}
                                className={`menu-nav-button ${step === 'payment' || step === 'bill' ? 'active' : ''}`}
                                disabled={selectedDishes.length === 0}
                            >
                                <i className="fas fa-shopping-cart"></i> Thanh toán
                            </button>
                        </nav>
                    </header>
    
                    <main className="customer-main">
                        {step === 'menu' && (
                            <section className="menu-container">
                                <h2 style={{ marginBottom: '10px' }}>Khám Phá Các Món Ăn</h2>
                                <div className="category-buttons-container">
                                    <button
                                        onClick={() => setActiveCategory('main')}
                                        className={`category-button ${activeCategory === 'main' ? 'active' : ''}`}
                                    >
                                        <i className="fas fa-bowl-food"></i> Các Món Chè
                                    </button>
                                    <button
                                        onClick={() => setActiveCategory('topping')}
                                        className={`category-button ${activeCategory === 'topping' ? 'active' : ''}`}
                                    >
                                        <i className="fas fa-cookie-bite"></i> Đồ Ăn Kèm
                                    </button>
                                </div>
                                <Menu dishes={filteredDishes} onAddToOrder={handleAddToOrder} />
                            </section>
                        )}
    
                        {step === 'payment' && (
                            <section className="payment-container">
                                <div className="order-summary-area">
                                    <h2>Đơn hàng của bạn</h2>
                                    <OrderSummary
                                        selectedDishes={selectedDishes}
                                        onRemoveFromOrder={handleRemoveFromOrder}
                                        onUpdateQuantity={handleUpdateQuantity}
                                    />
                                    {selectedDishes.length > 0 && (
                                        <button onClick={handleSubmitOrder} className="submit-order-button">
                                            <i className="fas fa-check-circle"></i> Xác nhận đơn hàng
                                        </button>
                                    )}
                                </div>
                            </section>
                        )}
    
                        {step === 'bill' && (
                            <section className="final-bill-container">
                                <Bill 
                                    selectedDishes={selectedDishes}
                                    tableId={tableId}
                                    orderInfo={orderInfo}
                                    orderTime={new Date()}
                                />
                                <button 
                                    onClick={() => window.print()} 
                                    className="print-bill-button"
                                >
                                    <i className="fas fa-print"></i> In hóa đơn
                                </button>
                            </section>
                        )}
                    </main>
                </div>
            ) : (
                <div className="qr-scanner-prompt">
                    <i className="fas fa-qrcode"></i>
                    <p>Quét mã QR tại bàn để bắt đầu đặt món.</p>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default Customer;