 import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

function Checkout() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    city: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // Navigate to order confirmation
    navigate('/confirmation');
  };

  return (
    <div className="checkout-container">
      <header className="amazon-header">
        <div className="logo">amazon<span>clone</span></div>
        <div className="cart-link">🛒 Cart</div>
      </header>

      <div className="checkout-wrapper">
        <h1 className="checkout-heading">Checkout</h1>

        <div className="checkout-grid">
          {/* Main Left Section */}
          <div className="checkout-left">
            {/* 1. Delivery Address */}
            <div className="checkout-card">
              <h2>1. Delivery Address</h2>
              <form className="checkout-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Enter your full name" />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="text" placeholder="Enter your phone number" />
                </div>
                <div className="form-group">
                  <label>City</label>
                  <select defaultValue="">
                    <option value="" disabled>Select your city</option>
                    <option value="Addis Ababa">Addis Ababa</option>
                    <option value="Dire Dawa">Dire Dawa</option>
                    <option value="Bahir Dar">Bahir Dar</option>
                    <option value="Hawassa">Hawassa</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Delivery Address</label>
                  <input type="text" placeholder="Enter your delivery address" />
                </div>
              </form>
            </div>

            {/* 2. Payment Method */}
            <div className="checkout-card">
              <h2>2. Payment Method</h2>
              <div className="payment-options">
                <label className="radio-label">
                  <input type="radio" name="payment" defaultChecked />
                  Credit or Debit Card
                </label>
                <div className="card-inputs">
                  <div className="form-group">
                    <label>Card Number</label>
                    <input type="text" placeholder="4532 •••• •••• 8921" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiration Date</label>
                      <input type="text" placeholder="MM/YY" />
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input type="password" placeholder="123" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Summary Sidebar */}
          <div className="checkout-right">
            <div className="checkout-card summary-card">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Items:</span>
                <span>$29.99</span>
              </div>
              <div className="summary-row">
                <span>Shipping & handling:</span>
                <span>$0.00</span>
              </div>
              <div className="summary-row savings">
                <span>Promotion Applied:</span>
                <span>-$0.00</span>
              </div>

              <hr />
             <div className="summary-row total-row">
                <strong>Order Total:</strong>
                <strong>$29.99</strong>
              </div>

              <button className="place-order-btn" onClick={handlePlaceOrder}>
                Place Your Order
              </button>

              <p className="secure-notice">
                🔒 Secure checkout • Your payment information is protected
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;