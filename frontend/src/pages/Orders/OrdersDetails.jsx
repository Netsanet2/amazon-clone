import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { getOrder } from '../../utils/orderStorage';
import './Orders.css';

function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const order = getOrder(orderId);

  const handleBuyAgain = (item) => {
    addToCart(item);
    navigate('/cart');
  };

  if (!order) {
    return (
      <div className="orders-wrapper">
        <h1>Order not found</h1>
        <Link to="/orders">Back to Your Orders</Link>
      </div>
    );
  }

  return (
    <div className="orders-wrapper">
      <div className="breadcrumb">
        <Link to="/orders">Your Orders</Link> &gt; <span>Order Details</span>
      </div>

      <div className="details-header">
        <h1>Order Details</h1>
        <p className="order-meta">
          Ordered on {new Date(order.date).toLocaleDateString()} | Order # {order.id}
        </p>
      </div>

      {/* Info Card: Shipping, Payment, Summary */}
      <div className="details-card info-grid">
        <div className="info-block">
          <h3>Shipping Address</h3>
          <p><strong>{order.shippingAddress.name}</strong></p>
          <p>{order.shippingAddress.address}</p>
          <p>{order.shippingAddress.city}{order.shippingAddress.region ? `, ${order.shippingAddress.region}` : ''}</p>
          <p>{order.shippingAddress.country}{order.shippingAddress.postalCode ? `, ${order.shippingAddress.postalCode}` : ''}</p>
          <p>{order.shippingAddress.phone}</p>
        </div>

        <div className="info-block">
          <h3>Payment Method</h3>
          <p>{order.paymentMethod}</p>
        </div>

        <div className="info-block summary-block">
          <h3>Order Summary</h3>
          <div className="summary-line">
            <span>Item(s) Subtotal:</span>
            <span>${order.summary.itemsSubtotal.toFixed(2)}</span>
          </div>
          <div className="summary-line">
            <span>Shipping & Handling:</span>
            <span>${order.summary.shipping.toFixed(2)}</span>
          </div>
          <div className="summary-line">
            <span>Total before tax:</span>
            <span>${(order.summary.itemsSubtotal + order.summary.shipping - order.summary.savings).toFixed(2)}</span>
          </div>
          <div className="summary-line">
            <span>Estimated tax:</span>
            <span>$0.00</span>
          </div>
          <hr />
          <div className="summary-line grand-total">
            <strong>Grand Total:</strong>
            <strong>${order.summary.total.toFixed(2)}</strong>
          </div>
        </div>
      </div>

      {/* Item List Section */}
      <div className="details-card items-card">
        {order.items.map((item) => (
          <div key={item.id} className="detail-item-row">
            <img src={item.image} alt={item.title} />
            <div className="detail-item-info">
              <h2 className="status-text">Order placed</h2>
              <Link to={`/product/${item.id}`} className="item-title">{item.title || item.name}</Link>
              <p className="item-price">${Number(item.price).toFixed(2)} · Quantity: {item.quantity}</p>
              <div className="item-actions">
                <button className="btn-primary-sm" onClick={() => handleBuyAgain(item)}>
                  Buy it again
                </button>
                <button className="btn-secondary-sm">Write a product review</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderDetails;