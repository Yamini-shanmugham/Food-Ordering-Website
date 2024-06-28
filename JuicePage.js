import React, { useContext, useState } from 'react';
import './JuicePage.css'; 
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; 
import appleJuiceImage from './img/apple.png';
import orangeJuiceImage from './img/orange.png';
import grapeJuiceImage from './img/grape.png';
import pineappleJuiceImage from './img/pine.png';
import watermelonJuiceImage from './img/water.png';
import mangoJuiceImage from './img/mango.png';
import { CartContext } from './CartProvider';

const JuicePage = () => {
    const [cartCount, setCartCount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [reviews, setReviews] = useState({});
    const [ratings, setRatings] = useState({
        1: 4.5, // apple juice
        2: 4.0, // orange juice
        3: 4.2, // grape juice
        4: 4.5, // pineapple juice
        5: 4.7, // watermelon juice
        6: 4.8  // mango juice
    });

    const juiceItems = [
        { id: 1, name: 'Apple Juice', image: appleJuiceImage, amount: 50, rating: ratings[1] },
        { id: 2, name: 'Orange Juice', image: orangeJuiceImage, amount: 60, rating: ratings[2] },
        { id: 3, name: 'Grape Juice', image: grapeJuiceImage, amount: 55, rating: ratings[3] },
        { id: 4, name: 'Pineapple Juice', image: pineappleJuiceImage, amount: 65, rating: ratings[4] },
        { id: 5, name: 'Watermelon Juice', image: watermelonJuiceImage, amount: 45, rating: ratings[5] },
        { id: 6, name: 'Mango Juice', image: mangoJuiceImage, amount: 70, rating: ratings[6] },
    ];
    const {addToCarts}=useContext(CartContext)
    // const addToCart = (item) => {
    //     const existingItem = cartItems.find(cartItem => cartItem.id === item.id);

    //     if (existingItem) {
    //         setCartItems(cartItems.map(cartItem =>
    //             cartItem.id === item.id
    //                 ? { ...cartItem, quantity: cartItem.quantity + 1 }
    //                 : cartItem
    //         ));
    //     } else {
    //         setCartItems([...cartItems, { ...item, quantity: 1 }]);
    //     }

    //     setCartCount(cartCount + 1);
    //     setTotalAmount(totalAmount + item.amount);
    // };

    const handleReviewSubmit = (itemId, review, rating) => {
        setTimeout(() => {
            console.log(`Submitted review for item ${itemId}: ${review}, Rating: ${rating}`);
            setReviews({
                ...reviews,
                [itemId]: ''
            });
            setRatings({
                ...ratings,
                [itemId]: rating
            });
        }, 500);
    };

    const handleReviewChange = (itemId, review) => {
        setReviews({
            ...reviews,
            [itemId]: review
        });
    };

    const handleRatingChange = (itemId, rating) => {
        setRatings({
            ...ratings,
            [itemId]: rating
        });
    };

    const renderStarRating = (rating) => {
        const starsTotal = 5;
        const starPercentage = (rating / starsTotal) * 100;
        const starStyle = {
            width: starPercentage + '%'
        };
        return (
            <div className="stars-outer">
                <div className="stars-inner" style={starStyle}></div>
            </div>
        );
    };

    const renderCartItems = () => {
        return cartItems.map((item, index) => (
            <div key={index} className="cart-item">
                {item.name} - ₹{item.amount} x {item.quantity}
            </div>
        ));
    };

    return (
        <div className="juice-container">
               <Link to="/menu" className="home-button">
        <FontAwesomeIcon icon={faTimes} /> 
      </Link>
            <h1>Juice Menu</h1>
            <div className="cart-summary">
                <div>Items in Cart: {cartCount}</div>
                <div>Total Amount: ₹{totalAmount}</div>
                <div className="cart-items">
                    {renderCartItems()}
                </div>
            </div>
            <div className="items">
                {juiceItems.map(item => (
                    <div key={item.id} className="item">
                        <img
                            src={item.image}
                            alt={item.name}
                            style={
                                item.id === 5 ? { width: '250px', height: 'auto' } :
                                item.id === 1 ? { height: '250px' } : 
                                item.id === 2 ? { height: '250px' } : 
                                {} // Default style when no condition matches
                            }
                        />
                        <p>{item.name}</p>
                        <p>₹{item.amount}</p>
                        <div className="rating">
                            {renderStarRating(item.rating)}
                        </div>
                        <textarea
                            className="review-box"
                            placeholder="Write your review..."
                            value={reviews[item.id] || ''}
                            onChange={(e) => handleReviewChange(item.id, e.target.value)}
                            rows="4"
                            cols="50"
                        ></textarea>
                        <div className="rating-input">
                            <label htmlFor={`rating-${item.id}`}>Rate this item:</label>
                            <input
                                type="number"
                                id={`rating-${item.id}`}
                                min="1"
                                max="5"
                                value={ratings[item.id] || ''}
                                onChange={(e) => handleRatingChange(item.id, e.target.value)}
                            />
                        </div>
                        <button onClick={() => addToCarts(item)}>Add to Cart</button>
                        <button onClick={() => handleReviewSubmit(item.id, reviews[item.id], ratings[item.id])}>Submit Review</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JuicePage;
