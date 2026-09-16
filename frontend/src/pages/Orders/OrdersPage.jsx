import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import products from '../../data/products';
import './Orders.css';

function OrdersPage() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const orders = [
    {
      id: '114-8291038-1029381',
      date: 'September 2, 2026',
      total: '$29.99',
      shipTo: 'Gidena Mehari',
      items: [
        {
          name: 'Wireless Bluetooth Headphones',
          price: '$29.99',
          image: 'https://via.placeholder.com/80'
        }
      ]
    }
  ];

  const handleBuyAgain = (item) => {
    const product = products.find((existingProduct) => existingProduct.name === item.name);

    if (!product) return;

    addToCart(product);
    navigate('/cart');
  };

  return (
    <div className="orders-wrapper">
      <h1>Your Orders</h1>

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            {/* Card Header */}
            <div className="order-header">
              <div>
                <span className="label">ORDER PLACED</span>
                <span>{order.date}</span>
              </div>
              <div>
                <span className="label">TOTAL</span>
                <span>{order.total}</span>
              </div>
              <div>
                <span className="label">SHIP TO</span>
                <span>{order.shipTo}</span>
              </div>
              <div className="order-id">
                <span className="label">ORDER # {order.id}</span>
              </div>
            </div>

            {/* Card Body */}
            <div className="order-body">
              {order.items.map((item, index) => (
                <div key={index} className="item-row">
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-price">{item.price}</p>
                    <button className="buy-again-btn" onClick={() => handleBuyAgain(item)}>
                      Buy it again
                    </button>
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