// MenuPage.js

import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; 
import './MenuPage.css'; 

const MenuPage = () => {
    return (
        <div className="container">
               <Link to="/" className="home-button">
        <FontAwesomeIcon icon={faTimes} />
      </Link>
            <ul>
            <li><Link to="/breakfast">Breakfast Menu</Link></li>
                <li><Link to="/lunch">Lunch Menu</Link></li>
                <li><Link to="/dinner">Dinner Menu</Link></li>
                <li><Link to="/juice">Juice</Link></li>
                <li><Link to="/ice">Ice-Creams</Link></li>
                <li><Link to='/pizza'>Pizza</Link></li>
            </ul>
        </div>
    );
};

export default MenuPage;
