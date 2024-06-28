import React, {useContext, useState } from 'react';
import './IcePage.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; 
import vanillaIcecreamImage from './img/vanilla.png';
import chocolateIcecreamImage from './img/chocolate.png';
import strawberryIcecreamImage from './img/strawberry.png';
import mangoIcecreamImage from './img/mangos.png';
import pistachioIcecreamImage from './img/pista.png';
import caramelIcecreamImage from './img/caramel.png';
import { CartContext } from './CartProvider';

const IcecreamPage = () => {
    const [cartCount, setCartCount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [reviews, setReviews] = useState({});
    const [ratings, setRatings] = useState({
        1: 4.5, // vanilla ice cream
        2: 4.0, // chocolate ice cream
        3: 4.2, // strawberry ice cream
        4: 4.5, // mango ice cream
        5: 4.7, // pistachio ice cream
        6: 4.8  // caramel ice cream
    });

    const icecreamItems = [
        { id: 1, name: 'Vanilla Ice Cream', image: vanillaIcecreamImage, amount: 40, rating: ratings[1] },
        { id: 2, name: 'Chocolate Ice Cream', image: chocolateIcecreamImage, amount: 50, rating: ratings[2] },
        { id: 3, name: 'Strawberry Ice Cream', image: strawberryIcecreamImage, amount: 45, rating: ratings[3] },
        { id: 4, name: 'Mango Ice Cream', image: mangoIcecreamImage, amount: 55, rating: ratings[4] },
        { id: 5, name: 'Pistachio Ice Cream', image: pistachioIcecreamImage, amount: 60, rating: ratings[5] },
        { id: 6, name: 'Caramel Ice Cream', image: caramelIcecreamImage, amount: 65, rating: ratings[6] },
    ];
    const { addToCarts } = useContext(CartContext); // Use useContext to get addToCart function

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
        <div className="icecream-container">
               <Link to="/menu" className="home-button">
        <FontAwesomeIcon icon={faTimes} /> 
      </Link>
            <h1>Ice Cream Menu</h1>
            <div className="cart-summary">
                <div>Items in Cart: {cartCount}</div>
                <div>Total Amount: ₹{totalAmount}</div>
                <div className="cart-items">
                    {renderCartItems()}
                </div>
            </div>
            <div className="items">
                {icecreamItems.map(item => (
                    <div key={item.id} className="item">
                        <img
                            src={item.image}
                            alt={item.name}
                            style={
                                item.id === 5 ? { width: '250px', height: 'auto' } :
                                item.id === 1 ? { height: '250px' } : 
                                item.id === 2 ? { height: '250px' } : 
                                item.id === 6 ? { height: '250px' } :
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

export default IcecreamPage;
