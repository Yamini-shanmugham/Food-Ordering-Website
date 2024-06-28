import React, { useContext } from 'react';
import { CartContext } from './CartProvider';
import { Link } from 'react-router-dom';
import './OrderSummaryPage.css';

const OrderSummaryPage = () => {
    const { cartItems } = useContext(CartContext);

    const calculateTotal = (items) => {
        return items.reduce((total, item) => total + (item.amount * item.quantity), 0);
    };

    return (
        <div className="order-summary-container">
            <h1>Order Summary</h1>

            <ul>
                {cartItems.map(item => (
                    <li key={item.id}>
                        {item.name} - ₹{item.amount} x {item.quantity}
                    </li>
                ))}
            </ul>
            <div className="total-section">Total Amount: ₹{calculateTotal(cartItems)}</div>

            <Link to="/menu">Back to Menu</Link>
        </div>
    );
};

export default OrderSummaryPage;
