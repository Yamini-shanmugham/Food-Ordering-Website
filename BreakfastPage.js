import React, { useContext, useState } from 'react';
import './BreakfastPage.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; 
import idlyImage from './img/idly.png';
import dosaImage from './img/dosa.png';
import pooriImage from './img/porri.png';
import pongalImage from './img/pongal.png';
import breadImage from './img/bread.png';
import pancakeImage from './img/pancake.png';
import { CartContext } from './CartProvider';

const BreakfastPage = () => {
    
    const [cartCount, setCartCount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [reviews, setReviews] = useState({});
    const [ratings, setRatings] = useState({
        1: 4.5, // idly
        2: 4.0, // dosa
        3: 3.5, // poori
        4: 4.2, // pongal
        5: 4.8, // bread omelette
        6: 4.8  // pancake
    });

    const breakfastItems = [
        { id: 1, name: 'Idly', image: idlyImage, amount: 20, rating: ratings[1] },
        { id: 2, name: 'Dosa', image: dosaImage, amount: 30, rating: ratings[2] },
        { id: 3, name: 'Poori', image: pooriImage, amount: 35, rating: ratings[3] },
        { id: 4, name: 'Pongal', image: pongalImage, amount: 40, rating: ratings[4] },
        { id: 5, name: 'Bread Omelette', image: breadImage, amount: 35, rating: ratings[5] },
        { id: 6, name: 'Pancake', image: pancakeImage, amount: 45, rating: ratings[6] },
    ];
    const { addToCarts } = useContext(CartContext); // Use useContext to get addToCart function
    
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
        <div className="breakfast-container">
            <Link to="/menu" className="home-button">
                <FontAwesomeIcon icon={faTimes} /> 
            </Link>
            <h1>Breakfast Menu</h1>
            <div className="cart-summary">
                <div>Items in Cart: {cartCount}</div>
                <div>Total Amount: ₹{totalAmount}</div>
                <div className="cart-items">
                    {renderCartItems()}
                </div>
            </div>
            <div className="items">
                {breakfastItems.map(item => (
                    <div key={item.id} className="item">
                        <img
                            src={item.image}
                            alt={item.name}
                            style={item.id === 6 || item.id === 4 ? { height: '170px' } : {}}
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

export default BreakfastPage;
