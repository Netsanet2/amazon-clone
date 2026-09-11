import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
// If you have AuthProvider/CartProvider, import them and wrap as needed.

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<h1>Products Page</h1>} />
        <Route path="/product/:id" element={<h1>Product Details</h1>} />
        <Route path="/cart" element={<h1>Cart Page</h1>} />
        <Route path="/checkout" element={<h1>Checkout Page</h1>} />
        <Route path="/orders" element={<h1>Orders Page</h1>} />
        <Route path="/login" element={<h1>Login Page</h1>} />
        <Route path="/register" element={<h1>Register Page</h1>} />
        <Route path="/account" element={<h1>Account Page</h1>} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
