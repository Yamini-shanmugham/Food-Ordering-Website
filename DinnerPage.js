import React, { useContext, useState } from 'react';
import './DinnerPage.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import idlyImage from './img/idly.png';
import dosaImage from './img/dosa.png';
import naanImage from './img/naan.png';
import pannerImage from './img/panner.png';
import butterChickenImage from './img/butter.png';
import chickBiryaniImage from './img/chick.png';
import muttonBiryaniImage from './img/mutton.png';
import fishBiryaniImage from './img/fish.png';
import prawnBiryaniImage from './img/prawn.png';
import { CartContext } from './CartProvider';

const DinnerPage = () => {
    const { addToCarts } = useContext(CartContext); // Use useContext to get addToCart function
    const [cartCount, setCartCount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [reviews, setReviews] = useState({});
    const [ratings, setRatings] = useState({
        1: 4.3, // Idly
        2: 4.7, // Dosa
        3: 4.5, // Naan
        4: 4.2, // Panner Butter Masala
        5: 4.8, // Butter Chicken
        6: 4.8, // Chicken Biryani
        7: 4.7, // Mutton Biryani
        8: 4.0, // Fish Biriyani
        9: 4.4  // Prawn Biriyani
    });

    const dinnerItems = [
        { id: 1, name: 'Idly', image: idlyImage, amount: 150, rating: ratings[1] },
        { id: 2, name: 'Dosa', image: dosaImage, amount: 200, rating: ratings[2] },
        { id: 3, name: 'Naan', image: naanImage, amount: 130, rating: ratings[3] },
        { id: 4, name: 'Panner Butter Masala', image: pannerImage, amount: 220, rating: ratings[4] },
        { id: 5, name: 'Butter Chicken', image: butterChickenImage, amount: 180, rating: ratings[5] },
        { id: 6, name: 'Chicken Biriyani', image: chickBiryaniImage, amount: 140, rating: ratings[6] },
        { id: 7, name: 'Mutton Biriyani', image: muttonBiryaniImage, amount: 190, rating: ratings[7] },
        { id: 8, name: 'Fish Biriyani', image: fishBiryaniImage, amount: 170, rating: ratings[8] },
        { id: 9, name: 'Prawn Biriyani', image: prawnBiryaniImage, amount: 220, rating: ratings[9] },
    ];

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
        <div className="dinner-container">
            <Link to="/menu" className="home-button">
                <FontAwesomeIcon icon={faTimes} />
            </Link>
            <h1>Dinner Menu</h1>
            <div className="cart-summary">
                <div>Items in Cart: {cartCount}</div>
                <div>Total Amount: ₹{totalAmount}</div>
                <div className="cart-items">
                    {renderCartItems()}
                </div>
            </div>
            <div className="items">
                {dinnerItems.map(item => (
                    <div key={item.id} className="item">
                        <img
                            src={item.image}
                            alt={item.name}
                            style={
                                item.id === 2 ? { width: '250px', height: 'auto' } :
                                item.id === 4 ? { width: '250px', height: 'auto' } :
                                item.id === 5 ? { width: '250px', height: 'auto' } :
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

export default DinnerPage;
