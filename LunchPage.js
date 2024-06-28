import React, { useContext, useState } from 'react';
import './LunchPage.css'; 
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; 
import vegImage from './img/veg.png';
import nonImage from './img/non.png';
import saladImage from './img/salad.png';
import chickImage from './img/chick.png';
import muttonImage from './img/mutton.png';
import fishImage from './img/fish.png';
import { CartContext } from './CartProvider';

const LunchPage = () => {
    const [cartCount, setCartCount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [reviews, setReviews] = useState({});
    const [ratings, setRatings] = useState({
        1: 4.2, // Veg Meals
        2: 4.5, // Non-Veg Meals
        3: 4.1, // Salad
        4: 4.8, // Chicken Biriyani
        5: 4.7, // Mutton Biriyani
        6: 4.0  // Fish Biriyani
    });

    const lunchItems = [
        { id: 1, name: 'Veg Meals', image: vegImage, amount: 120, rating: ratings[1] },
        { id: 2, name: 'Non-Veg Meals', image: nonImage, amount: 170, rating: ratings[2] },
        { id: 3, name: 'Salad', image: saladImage, amount: 50, rating: ratings[3] },
        { id: 4, name: 'Chicken Biriyani', image: chickImage, amount: 140, rating: ratings[4] },
        { id: 5, name: 'Mutton Biriyani', image: muttonImage, amount: 190, rating: ratings[5] },
        { id: 6, name: 'Fish Biriyani', image: fishImage, amount: 170, rating: ratings[6] },
    ];
    const {addToCarts} = useContext(CartContext)

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
        <div className="lunch-container">
                <Link to="/menu" className="home-button">
        <FontAwesomeIcon icon={faTimes} /> 
      </Link>
            <h1>Lunch Menu</h1>
            <div className="cart-summary">
                <div>Items in Cart: {cartCount}</div>
                <div>Total Amount: ₹{totalAmount}</div>
                <div className="cart-items">
                    {renderCartItems()}
                </div>
            </div>
            <div className="items">
                {lunchItems.map(item => (
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

export default LunchPage;
