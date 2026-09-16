import React from 'react';
import { Link } from 'react-router-dom';
import './Confirmation.css';

function Confirmation() {
  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <div className="success-header">
          <span className="check-icon">✓</span>
          <h2>Order placed, thank you!</h2>
        </div>
        <p className="confirmation-text">
          Confirmation will be sent to your email.
        </p>

        <div className="delivery-details">
          <strong>Guaranteed delivery:</strong> Tomorrow
        </div>

        <div className="actions">
          <Link to="/orders" className="btn-secondary">View Your Orders</Link>
          <Link to="/products" className="btn-primary">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;