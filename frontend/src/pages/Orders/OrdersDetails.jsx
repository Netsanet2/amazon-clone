import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { getOrderById } from '../../services/orderService';
import './Orders.css';

function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadOrder = async () => {
      if (!user?.uid || !orderId) {
        setLoading(false);
        return;
      }

      try {
        const orderData = await getOrderById(orderId);

        if (!orderData) {
          setOrder(null);
          return;
        }

        // Make sure the customer can only view their own order
        if (orderData.userId !== user.uid) {
          setOrder(null);
          return;
        }

        setOrder(orderData);
      } catch (error) {
        console.error('Failed to load order:', error);
        setError('Unable to load this order.');
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId, user]);

  const handleBuyAgain = (item) => {
    addToCart(item);
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="orders-wrapper">
        <h1>Order Details</h1>
        <p>Loading order...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-wrapper">
        <h1>Order Details</h1>
        <p>{error}</p>
        <Link to="/orders">Back to Your Orders</Link>
      </div>
    );
  }

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
          Ordered on {order.createdAt
            ? new Date(order.createdAt).toLocaleDateString()
            : 'Date unavailable'} | Order # {order.id}
        </p>
      </div>

      {/* Info Card: Shipping, Payment, Summary */}
      <div className="details-card info-grid">
        <div className="info-block">
          <h3>Shipping Address</h3>
          <p><strong>{order.shippingAddress.name}</strong></p>
          <p>{order.shippingAddress.address}</p>
          <p>
            {order.shippingAddress.city}
            {order.shippingAddress.region
              ? `, ${order.shippingAddress.region}`
              : ''}
          </p>
          <p>
            {order.shippingAddress.country}
            {order.shippingAddress.postalCode
              ? `, ${order.shippingAddress.postalCode}`
              : ''}
          </p>
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
            <span>${Number(order.summary.itemsSubtotal).toFixed(2)}</span>
          </div>

          <div className="summary-line">
            <span>Shipping & Handling:</span>
            <span>${Number(order.summary.shipping).toFixed(2)}</span>
          </div>

          <div className="summary-line">
            <span>Total before tax:</span>
            <span>
              $
              {(
                Number(order.summary.itemsSubtotal) +
                Number(order.summary.shipping) -
                Number(order.summary.savings)
              ).toFixed(2)}
            </span>
          </div>

          <div className="summary-line">
            <span>Estimated tax:</span>
            <span>$0.00</span>
          </div>

          <hr />

          <div className="summary-line grand-total">
            <strong>Grand Total:</strong>
            <strong>${Number(order.summary.total).toFixed(2)}</strong>
          </div>
        </div>
      </div>

      {/* Item List Section */}
      <div className="details-card items-card">
        {order.items.map((item) => (
          <div key={item.id} className="detail-item-row">
            <img
              src={item.image}
              alt={item.title || item.name}
            />

            <div className="detail-item-info">
              <h2 className="status-text">Order placed</h2>

              <Link
                to={`/product/${item.id}`}
                className="item-title"
              >
                {item.title || item.name}
              </Link>

              <p className="item-price">
                ${Number(item.price).toFixed(2)} · Quantity: {item.quantity}
              </p>

              <div className="item-actions">
                <button
                  className="btn-primary-sm"
                  onClick={() => handleBuyAgain(item)}
                >
                  Buy it again
                </button>

                <button className="btn-secondary-sm">
                  Write a product review
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderDetails;