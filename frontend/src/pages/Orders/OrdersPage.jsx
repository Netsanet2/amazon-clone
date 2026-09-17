import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { getOrders } from '../../utils/orderStorage';
import './Orders.css';

function OrdersPage() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const orders = getOrders();

  const handleBuyAgain = (item) => {
    addToCart(item);
    navigate('/cart');
  };

  return (
    <div className="orders-wrapper">
      <h1>Your Orders</h1>

      <div className="orders-list">
        {orders.length === 0 ? (
          <div className="empty-orders">
            <h2>You have no orders yet</h2>
            <Link to="/products" className="buy-again-btn">Continue Shopping</Link>
          </div>
        ) : orders.map((order) => (
          <div key={order.id} className="order-card">
            {/* Card Header */}
            <div className="order-header">
              <div>
                <span className="label">ORDER PLACED</span>
                <span>{new Date(order.date).toLocaleDateString()}</span>
              </div>
              <div>
                <span className="label">TOTAL</span>
                <span>${order.summary.total.toFixed(2)}</span>
              </div>
              <div>
                <span className="label">SHIP TO</span>
                <span>{order.shippingAddress.name || user?.name}</span>
              </div>
              <div className="order-id">
                <span className="label">ORDER # {order.id}</span>
                <Link to={`/orders/${order.id}`}>View Order Details</Link>
              </div>
            </div>

            {/* Card Body */}
            <div className="order-body">
              <div className="order-shipping-address">
                <h3>Ship to:</h3>
                <p>{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.address}</p>
                <p>{order.shippingAddress.city}{order.shippingAddress.region ? `, ${order.shippingAddress.region}` : ''}</p>
                <p>{order.shippingAddress.country}{order.shippingAddress.postalCode ? `, ${order.shippingAddress.postalCode}` : ''}</p>
                <p>{order.shippingAddress.phone}</p>
              </div>
              {order.items.map((item) => (
                <div key={item.id} className="item-row">
                  <img src={item.image} alt={item.title || item.name} />
                  <div className="item-details">
                    <h3>{item.title || item.name}</h3>
                    <p className="item-price">${Number(item.price).toFixed(2)}</p>
                    <p>Quantity: {item.quantity}</p>
                    <button className="buy-again-btn" onClick={() => handleBuyAgain(item)}>
                      Buy it again
                    </button>
                    <Link to="/products" className="order-action-link">
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;