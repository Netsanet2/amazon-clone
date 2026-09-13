// 1. Add Link to your imports
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './CustomerServicePage.css';

const CustomerServicePage = () => {
  // ... (keep your searchQuery and activeCategory state)

  // 2. Add a 'path' to each card in your data array
  const actionCards = [
    { id: 1, icon: '📦', title: 'A delivery, order or return', path: 'delivery-order-return' },
    { id: 2, icon: '🔑', title: 'Help with signing in', path: 'sign-in-help' },
    { id: 3, icon: 'prime', title: 'Prime', path: 'prime' },
    { id: 4, icon: '📱', title: 'Kindle, Fire, Alexa, or other Amazon devices', path: 'devices' },
    { id: 5, icon: '▶️', title: 'eBooks, Prime Videos, Music, or Games', path: 'digital-services' },
    { id: 6, icon: '💳', title: 'Payment, charges or gift cards', path: 'payments' },
    { id: 7, icon: '🔒', title: 'Address, security & privacy', path: 'security-privacy' },
    { id: 8, icon: '👤', title: 'Memberships, subscriptions or communications', path: 'memberships' },
    { id: 9, icon: '♿', title: 'Accessibility', path: 'accessibility' },
    { id: 10, icon: '❓', title: 'Something else', path: 'something-else' },
    { id: 11, icon: '⚠️', title: 'Report Something Suspicious', path: 'report-suspicious' },
  ];

  return (
    <div className="cs-page-container">
      <div className="cs-hero-section">
        <div className="cs-hero-content">
          <h1>Welcome to Amazon Customer Service</h1>
          <p>We can help you take care of most things here, sign in to get started.</p>
          
          <div className="cs-action-grid">
            {actionCards.map((card) => (
              // 3. Change the <div> to a <Link> and point it to the dynamic path
              <Link to={`/customer-service/${card.path}`} className="cs-action-card" key={card.id}>
                <div className="cs-action-icon">{card.icon}</div>
                <span>{card.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* ... (rest of your component) */}
    </div>
  );
};

export default CustomerServicePage;