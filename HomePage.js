import React from "react";
import { Link } from "react-router-dom";
import './HomePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';

const HomePage = () => {
    return (
        <div className="home">
           <header className="head">
            <h2>Food Delivery Services</h2>
           <nav>
               <ul>
                   <li><Link to="/">Home</Link></li>
                   <li><Link to="/menu">Menu</Link></li>
                   <li><Link to="/orders">Orders</Link></li>
                   <li><Link to="/login">Login/Register</Link></li>
               </ul>
           </nav>
           </header>
           <section className="section">
               {/* Your main content section */}
           </section>
          
          <footer className="foot">
              <div className="footer-columns">
                  {/* Column 1: Quick Links */}
                  <div className="footer-column1">
                      <h3>Quick Links</h3>
                      <ul>
                          <li><Link to="/">Home</Link></li>
                          <li><Link to="/menu">Menu</Link></li>
                          <li><Link to="/orders">Orders</Link></li>
                          <li><Link to="/login">Login/Register</Link></li>
                      </ul>
                  </div>
                  {/* Column 2: Our Services */}
                  <div className="footer-column2">
                      <h3>Our Services</h3>
                      <p>
                          "At Food Delivery Service, we specialize in bringing convenience and
                          culinary delight right to your doorstep. With a diverse selection 
                          of local restaurants at your fingertips, you can explore a world of 
                          flavors without leaving your home. Whether you're craving comfort food 
                          classics or gourmet specialties, our platform ensures swift and reliable
                          delivery, ensuring your meals arrive fresh and piping hot. Enjoy the 
                          ease of ordering through our user-friendly app or website."
                      </p>
                  </div>
                  {/* Column 3: Social Media Links */}
                  <div className="footer-column3">
                      <h3>Follow Us</h3>
                      <ul className="social-links">
                          <li><a href="#"><FontAwesomeIcon icon={faFacebook} /></a></li>
                          <li><a href="#"><FontAwesomeIcon icon={faTwitter} /></a></li>
                          <li><a href="#"><FontAwesomeIcon icon={faInstagram} /></a></li>
                          <li><a href="#"><FontAwesomeIcon icon={faYoutube} /></a></li>
                      </ul>
                  </div>
              </div>
              <p className="copyright">&copy; 2024 Food Delivery Service. All rights reserved.</p>
          </footer>
        </div>
    );
}

export default HomePage;
