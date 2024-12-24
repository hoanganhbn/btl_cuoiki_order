// frontend/src/components/Customer/Menu.js
import React from 'react';
import '../../styles/components/Customer/Menu.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Menu = ({ dishes, onAddToOrder }) => {
    return (
        <div className="menu-grid">
            {dishes.map((dish) => (
                <div key={dish.id} className="menu-item-card">
                    <img
                        src={`/images/${dish.image_url}`}
                        alt={dish.name}
                        className="dish-image"
                    />
                    <div className="dish-details">
                        <h3>{dish.name}</h3>
                        <p className="dish-price">
                            {dish.price.toLocaleString('vi-VN')} VNĐ
                        </p>
                        <p className="dish-description">{dish.description}</p>
                        {dish.available ? (
                            <button onClick={() => onAddToOrder(dish)} className="add-button">
                                <i className="fas fa-plus"></i> Thêm
                            </button>
                        ) : (
                            <span className="out-of-stock">Hết hàng</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Menu;