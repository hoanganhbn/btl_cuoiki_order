// frontend/src/components/Customer/OrderSummary.js
import React from 'react';
import '../../styles/components/Customer/OrderSummary.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const OrderSummary = ({ selectedDishes, onRemoveFromOrder, onUpdateQuantity }) => {
    const totalPrice = selectedDishes.reduce(
        (total, dish) => total + dish.price * dish.quantity,
        0
    );

    const handleQuantityChange = (dish, newValue) => {
        const newQuantity = parseInt(newValue);
        if (newQuantity >= 1 && newQuantity <= 99) {
            onUpdateQuantity(dish.id, newQuantity);
        }
    };

    return (
        <div className="order-summary-container">
            {selectedDishes.length === 0 ? (
                <p className="empty-order">Chưa có món ăn nào trong đơn hàng.</p>
            ) : (
                <ul className="order-items">
                    {selectedDishes.map((dish) => (
                        <li key={dish.id} className="order-item">
                            <div className="item-info">
                                <span>{dish.name}</span>
                                <div className="quantity-wrapper">
                                    <button 
                                        className="quantity-btn"
                                        onClick={() => handleQuantityChange(dish, dish.quantity - 1)}
                                        disabled={dish.quantity <= 1}
                                    >
                                        <i className="fas fa-minus"></i>
                                    </button>
                                    <input
                                        type="number"
                                        min="1"
                                        max="99"
                                        value={dish.quantity}
                                        onChange={(e) => handleQuantityChange(dish, e.target.value)}
                                        className="quantity-input"
                                    />
                                    <button 
                                        className="quantity-btn"
                                        onClick={() => handleQuantityChange(dish, dish.quantity + 1)}
                                        disabled={dish.quantity >= 99}
                                    >
                                        <i className="fas fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="item-actions">
                                <span className="item-total">
                                    {(dish.price * dish.quantity).toLocaleString()} VNĐ
                                </span>
                                <button
                                    onClick={() => onRemoveFromOrder(dish.id)}
                                    className="remove-item-button"
                                >
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {selectedDishes.length > 0 && (
                <div className="order-summary-total">
                    Tổng cộng: <span>{totalPrice.toLocaleString()} VNĐ</span>
                </div>
            )}
        </div>
    );
};

export default OrderSummary;