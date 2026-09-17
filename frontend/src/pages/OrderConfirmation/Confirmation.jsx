import React from 'react';
import { Link } from 'react-router-dom';
import { getOrders } from '../../utils/orderStorage';
import './Confirmation.css';

function Confirmation() {
  const order = getOrders()[0];

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <div className="success-header">
          <span className="check-icon">✓</span>
          <h2>Order placed, thank you!</h2>
        </div>
        <p className="confirmation-text">
          {order?.customer?.email
            ? `Confirmation will be sent to ${order.customer.email}.`
            : 'Your order has been placed successfully.'}
        </p>

        <div className="delivery-details">
          <strong>Order total:</strong> ${order?.summary?.total?.toFixed(2) || '0.00'}
          {order?.shippingAddress?.name && (
            <span> · Ship to {order.shippingAddress.name}</span>
          )}
        </div>

        {order?.items?.map((item) => (
          <div className="confirmation-item" key={item.id}>
            <img src={item.image} alt={item.title || item.name} />
            <div>
              <strong>{item.title || item.name}</strong>
              <p>${Number(item.price).toFixed(2)} · Quantity: {item.quantity}</p>
            </div>
          </div>
        ))}

        <div className="actions">
          <Link to="/orders" className="btn-secondary">View Your Orders</Link>
          <Link to="/products" className="btn-primary">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;