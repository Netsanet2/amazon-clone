import React, { useEffect, useState } from 'react';
import { getUserOrders } from '../../services/orderService';
import './Orders.css';

const Orders = ({ currentUser }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (currentUser?.uid) {
        try {
          const data = await getUserOrders(currentUser.uid);
          setOrders(data);
        } catch (error) {
          console.error("Error loading orders:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchOrders();
  }, [currentUser]);

  if (loading) return <div className="amazon-orders-container"><p>Loading orders...</p></div>;

  return (
    <div className="amazon-orders-container">
      <h1 className="orders-title">Your Orders</h1>
      {orders.map((order) => (
        <div key={order.id} className="amazon-order-card">
          <div className="order-card-header">
            <div>
              <span>ORDER PLACED</span>
              <p>{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <span>TOTAL</span>
              <p>${order.totalAmount?.toFixed(2)}</p>
            </div>
            <div>
              <span>SHIP TO</span>
              <p>{order.shippingAddress?.fullName}</p>
            </div>
            <div>ORDER # {order.id}</div>
          </div>
          <div className="order-card-body">
            <h3 className="order-status">{order.status || 'Processing'}</h3>
            {order.items?.map((item, idx) => (
              <div key={idx} className="order-item-row">
                <img src={item.image} alt={item.title} className="order-item-img" />
                <div>
                  <p className="order-item-title">{item.title}</p>
                  <p>Qty: {item.quantity}</p>
                  <p className="order-item-price">${item.price?.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;