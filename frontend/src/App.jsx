import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerPreferences from './pages/CustomerPreferences/CustomerPreferences';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';

import CustomerServicePage from './pages/CustomerServicePage/CustomerServicePage';
import RegistryPage from './pages/RegistryPage/RegistryPage';
import TodaysDealsPage from './pages/TodaysDealsPage/TodaysDealsPage';
import SellPage from './pages/SellPage/SellPage';
import SellerIncentives from './pages/SellerIncentives/SellerIncentives';
import { LanguageProvider } from "./pages/LanguageContext/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Navbar />
        
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<h1>Products Page</h1>} />
          <Route path="/product/:id" element={<h1>Product Details</h1>} />
          <Route path="/cart" element={<h1>Cart Page</h1>} />
          <Route path="/checkout" element={<h1>Checkout Page</h1>} />
          <Route path="/orders" element={<h1>Orders Page</h1>} />
          <Route path="/login" element={<h1>Login Page</h1>} />
          <Route path="/register" element={<h1>Register Page</h1>} />
          <Route path="/account" element={<h1>Account Page</h1>} />

          {/* Customer Service */}
          <Route path="/customer-service" element={<CustomerServicePage />} />
          <Route path="/customer-service/:topic" element={<h1>Customer Service Topic Page</h1>} />

          {/* Today's Deals */}
          <Route path="/todays-deals" element={<TodaysDealsPage />} />

          {/* Registry */}
          <Route path="/registry" element={<RegistryPage />} />

          {/* Sell Pages */}
          <Route path="/sell" element={<SellPage />} />
          <Route path="/sell/incentives" element={<SellerIncentives />} />

          {/* Other Secondary Pages */}
          <Route path="/gift-cards" element={<h1>Gift Cards Page</h1>} />
          <Route path="/customer-preferences" element={<CustomerPreferences />} />
          <Route path="/labor-day" element={<h1>Labor Day Sale Page</h1>} />

          {/* 404 Page */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;