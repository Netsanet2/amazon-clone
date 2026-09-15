import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './Orders.css';

function OrderDetails() {
  const { orderId } = useParams();

  // Mock order data
  const order = {
    id: orderId || '114-8291038-1029381',
    date: 'September 2, 2026',
    shippingAddress: {
      name: 'Gidena Mehari',
      street: 'Bole Road, House #104',
      city: 'Addis Ababa',
      country: 'Ethiopia'
    },
    paymentMethod: 'Visa ending in 8921',
    summary: {
      itemsSubtotal: '$29.99',
      shipping: '$0.00',
      totalBeforeTax: '$29.99',
      estimatedTax: '$0.00',
      grandTotal: '$29.99'
    },
    items: [
      {
        id: 1,
        title: 'Wireless Bluetooth Headphones',
        price: '$29.99',
        status: 'Delivered',
        deliveryDate: 'September 3, 2026',
        image: 'https://via.placeholder.com/100'
      }
    ]
  };

  return (
    <div className="orders-wrapper">
      <div className="breadcrumb">
        <Link to="/orders">Your Orders</Link> &gt; <span>Order Details</span>
      </div>

      <div className="details-header">
        <h1>Order Details</h1>
        <p className="order-meta">
          Ordered on {order.date} | Order # {order.id}
        </p>
      </div>

      {/* Info Card: Shipping, Payment, Summary */}
      <div className="details-card info-grid">
        <div className="info-block">
          <h3>Shipping Address</h3>
          <p><strong>{order.shippingAddress.name}</strong></p>
          <p>{order.shippingAddress.street}</p>
          <p>{order.shippingAddress.city}</p>
          <p>{order.shippingAddress.country}</p>
        </div>

        <div className="info-block">
          <h3>Payment Method</h3>
          <p>{order.paymentMethod}</p>
        </div>

        <div className="info-block summary-block">
          <h3>Order Summary</h3>
          <div className="summary-line">
            <span>Item(s) Subtotal:</span>
            <span>{order.summary.itemsSubtotal}</span>
          </div>
          <div className="summary-line">
            <span>Shipping & Handling:</span>
            <span>{order.summary.shipping}</span>
          </div>
          <div className="summary-line">
            <span>Total before tax:</span>
            <span>{order.summary.totalBeforeTax}</span>
          </div>
          <div className="summary-line">
            <span>Estimated tax:</span>
            <span>{order.summary.estimatedTax}</span>
          </div>
          <hr />
          <div className="summary-line grand-total">
            <strong>Grand Total:</strong>
            <strong>{order.summary.grandTotal}</strong>
          </div>
        </div>
      </div>

      {/* Item List Section */}
      <div className="details-card items-card">
        {order.items.map((item) => (
          <div key={item.id} className="detail-item-row">
            <img src={item.image} alt={item.title} />
            <div className="detail-item-info">
              <h2 className="status-text">{item.status} {item.deliveryDate}</h2>
              <Link to="#" className="item-title">{item.title}</Link>
              <p className="item-price">{item.price}</p>
              <div className="item-actions">
                <button className="btn-primary-sm">Buy it again</button>
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