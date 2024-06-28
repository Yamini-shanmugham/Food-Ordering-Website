import React, { useContext, useState } from 'react';
import './PizzaPage.css'; // Import PizzaPage-specific styles
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // Example icon import
import margheritaImage from './img/margherita.png';
import pepperoniImage from './img/pepperoni.png';
import veggieImage from './img/veggie.png';
import cheeseImage from './img/cheese.png';
import bbqChickenImage from './img/bbq-chicken.png';
import seafoodImage from './img/seafood.png';
import { CartContext } from './CartProvider';

const PizzaPage = () => {
    const [cartCount, setCartCount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [reviews, setReviews] = useState({});
    const [ratings, setRatings] = useState({
        1: 4.5, // Margherita
        2: 4.2, // Pepperoni
        3: 4.8, // Veggie
        4: 4.0, // Cheese
        5: 4.6, // BBQ Chicken
        6: 4.3  // Seafood
    });

    const pizzaItems = [
        { id: 1, name: 'Margherita', image: margheritaImage, amount: 200, rating: ratings[1] },
        { id: 2, name: 'Pepperoni', image: pepperoniImage, amount: 250, rating: ratings[2] },
        { id: 3, name: 'Veggie', image: veggieImage, amount: 230, rating: ratings[3] },
        { id: 4, name: 'Cheese', image: cheeseImage, amount: 220, rating: ratings[4] },
        { id: 5, name: 'BBQ Chicken', image: bbqChickenImage, amount: 280, rating: ratings[5] },
        { id: 6, name: 'Seafood', image: seafoodImage, amount: 300, rating: ratings[6] },
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
        <div className="pizza-container">
               <Link to="/menu" className="home-button">
        <FontAwesomeIcon icon={faTimes} /> {/* Example icon usage */}
      </Link>
            <h1>Pizza Menu</h1>
            <div className="cart-summary">
                <div>Items in Cart: {cartCount}</div>
                <div>Total Amount: ₹{totalAmount}</div>
                <div className="cart-items">
                    {renderCartItems()}
                </div>
            </div>
            <div className="items">
                {pizzaItems.map(item => (
                    <div key={item.id} className="item">
                        <img
                            src={item.image}
                            alt={item.name}
                            style={item.id === 6 ? { height: '250px' } :
                            item.id === 5 ? { height: '250px' } :
                             {}}
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

export default PizzaPage;
