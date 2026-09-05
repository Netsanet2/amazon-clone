import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Checkout from './pages/Checkout/Checkout';
import Confirmation from './pages/OrderConfirmation/Confirmation';
import OrdersPage from './pages/Orders/OrdersPage';
import './App.css';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/orders" element={<OrdersPage />} />
        {/* Default route redirects to checkout */}
        <Route path="*" element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default App;