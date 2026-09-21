import React, { useState } from 'react';
import { createOrder } from '../../services/orderService';
import './Checkout.css';

const Checkout = ({ cartItems = [], currentUser, clearCart, navigateToOrders }) => {
  const [address, setAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    zipCode: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal > 35 ? 0 : 5.99;
  const total = subtotal + tax + shipping;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!currentUser) return alert("Please log in to place an order.");

    setIsSubmitting(true);
    try {
      await createOrder({
        userId: currentUser.uid,
        userEmail: currentUser.email,
        shippingAddress: address,
        items: cartItems,
        subtotal,
        tax,
        shipping,
        totalAmount: total,
      });
      if (clearCart) clearCart();
      if (navigateToOrders) navigateToOrders();
    } catch (err) {
      alert("Error placing order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="amazon-checkout-container">
      <h1 className="checkout-title">Checkout ({cartItems.length} items)</h1>
      <div className="checkout-layout">
        <div className="checkout-left">
          <h3>Shipping Address</h3>
          <form className="address-form" onSubmit={handlePlaceOrder}>
            <input 
              type="text" 
              placeholder="Full Name" 
              value={address.fullName} 
              onChange={(e) => setAddress({...address, fullName: e.target.value})} 
              required 
            />
            <input 
              type="text" 
              placeholder="Street Address" 
              value={address.street} 
              onChange={(e) => setAddress({...address, street: e.target.value})} 
              required 
            />
            <input 
              type="text" 
              placeholder="City" 
              value={address.city} 
              onChange={(e) => setAddress({...address, city: e.target.value})} 
              required 
            />
            <input 
              type="text" 
              placeholder="ZIP Code" 
              value={address.zipCode} 
              onChange={(e) => setAddress({...address, zipCode: e.target.value})} 
              required 
            />
          </form>
        </div>
        <div className="checkout-right">
          <div className="amazon-summary-card">
            <button className="amazon-btn-primary" onClick={handlePlaceOrder} disabled={isSubmitting}>
              {isSubmitting ? 'Placing Order...' : 'Place your order'}
            </button>
            <div className="summary-breakdown">
              <h3>Order Summary</h3>
              <p>Items: ${subtotal.toFixed(2)}</p>
              <p>Shipping: ${shipping.toFixed(2)}</p>
              <p>Tax: ${tax.toFixed(2)}</p>
              <hr />
              <h4 className="total-row">Order Total: ${total.toFixed(2)}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;