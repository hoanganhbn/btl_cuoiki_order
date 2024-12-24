// frontend/src/components/Customer/Bill.js
import React from 'react';
import '../../styles/components/Customer/Bill.css';

const Bill = ({ selectedDishes, tableId, orderTime, orderInfo }) => {
    const totalPrice = selectedDishes.reduce(
        (total, dish) => total + dish.price * dish.quantity,
        0
    );

    // Format date
    const formatDate = (date) => {
        return new Date(date).toLocaleString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="bill-container">
            <div className="bill-header">
                <h2>Quán Chè Ngọc Thạch</h2>
                <p className="address">123 Đường ABC, Phường XYZ, Quận/Huyện, Thành phố</p>
                <p className="contact">Điện thoại: 0123 456 789</p>
                <div className="bill-divider"></div>
            </div>

            <div className="bill-info">
                <h3>HÓA ĐƠN THANH TOÁN</h3>
                <div className="bill-details">
                    <p><strong>Thời gian:</strong> {formatDate(orderTime || new Date())}</p>
                    <p><strong>Số bàn:</strong> {tableId}</p>
                    <p><strong>Mã đơn hàng:</strong> {orderInfo && orderInfo.order_id ? `#${orderInfo.order_id}` : 'Đang xử lý...'}</p>
                </div>
            </div>

            {selectedDishes.length === 0 ? (
                <p className="empty-bill">Không có sản phẩm nào trong hóa đơn.</p>
            ) : (
                <>
                    <table className="bill-table">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên món</th>
                                <th>Đơn giá</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedDishes.map((dish, index) => (
                                <tr key={dish.id}>
                                    <td>{index + 1}</td>
                                    <td>{dish.name}</td>
                                    <td>{dish.price.toLocaleString('vi-VN')}đ</td>
                                    <td>{dish.quantity}</td>
                                    <td>{(dish.price * dish.quantity).toLocaleString('vi-VN')}đ</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="bill-summary">
                        <div className="summary-row">
                            <span>Tổng cộng:</span>
                            <span>{totalPrice.toLocaleString('vi-VN')}đ</span>
                        </div>
                        <div className="summary-row">
                            <span>Thuế VAT (8%):</span>
                            <span>{(totalPrice * 0.08).toLocaleString('vi-VN')}đ</span>
                        </div>
                        <div className="summary-row total">
                            <span>Thành tiền:</span>
                            <span>{(totalPrice * 1.08).toLocaleString('vi-VN')}đ</span>
                        </div>
                    </div>
                </>
            )}

            <div className="bill-footer">
                <p className="thank-you">Cảm ơn quý khách đã ủng hộ!</p>
                <p className="welcome-back">Hẹn gặp lại quý khách!</p>
                <div className="bill-contact">
                    <p>Website: www.quanchengocthach.com</p>
                    <p>Facebook: Quán Chè Ngọc Thạch</p>
                </div>
            </div>
        </div>
    );
};

export default Bill;