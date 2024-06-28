import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import MenuPage from './MenuPage';
import BreakfastPage from './BreakfastPage';
import LunchPage from './LunchPage';
import DinnerPage from './DinnerPage';
import JuicePage from './JuicePage';
import IcePage from './IcePage';
import PizzaPage from './PizzaPage';
import OrderSummaryPage from './OrderSummaryPage';
import Login from './Login';
import Orders from './Orders';
import CartProvider from './CartProvider'; // Import CartProvider

const App = () => {
    return (
        <CartProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/menu" element={<MenuPage />} />
                    <Route path="/breakfast" element={<BreakfastPage />} />
                    <Route path='/lunch' element={<LunchPage />} />
                    <Route path='/dinner' element={<DinnerPage />} />
                    <Route path='/juice' element={<JuicePage />} />
                    <Route path='/ice' element={<IcePage />} />
                    <Route path="/pizza" element={<PizzaPage />} />
                    <Route path="/ordersummary" element={<OrderSummaryPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/orders" element={<Orders />} />
                </Routes>
            </Router>
        </CartProvider>
    );
};

export default App;
