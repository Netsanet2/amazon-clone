import React from 'react';
import { Link } from 'react-router-dom';
import UserProfile from '../../components/UserProfile/UserProfile';
import './Account.css';

export default function Account() {
  const accountCards = [
    {
      title: 'Your Orders',
      description: 'Track, return, or buy things again',
      iconUrl:
        'https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/order._CB660668735_.png',
      link: '/orders',
    },
    {
      title: 'Login & Security',
      description: 'Edit login, name, and password settings',
      iconUrl:
        'https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/security._CB659600494_.png',
      link: '/security',
    },
    {
      title: 'Personal Information',
      description: 'Manage name, profile details, and preferences',
      iconUrl:
        'https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/security._CB659600494_.png',
      link: '/profile',
    },
    {
      title: 'Your Addresses',
      description: 'Edit addresses for orders and gifts',
      iconUrl:
        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"%3E%3Ccircle cx="25" cy="25" r="25" fill="%23e0f2f1"/%3E%3Cpath d="M25 11c-7 0-12 5.4-12 12.1C13 32.2 25 41 25 41s12-8.8 12-17.9C37 16.4 32 11 25 11zm0 16.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z" fill="%23007185"/%3E%3C/svg%3E',
      link: '/addresses',
    },
    {
      title: 'Your Payments',
      description: 'Manage payment methods and transactions',
      iconUrl:
        'https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/payment._CB660668735_.png',
      link: '/payment-methods',
    },
    {
      title: 'Your Lists',
      description: 'View, modify, and share your wishlists',
      iconUrl:
        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"%3E%3Ccircle cx="25" cy="25" r="25" fill="%23e0f2f1"/%3E%3Cpath d="M15 14h20v4H15zm0 8h20v4H15zm0 8h14v4H15z" fill="%23007185"/%3E%3C/svg%3E',
      link: '/lists',
    },
    {
      title: 'Gift Cards',
      description: 'View balance, redeem, or reload gift cards',
      iconUrl:
        'https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/payment._CB660668735_.png',
      link: '/gift-cards',
    },
    {
      title: 'Your Messages',
      description: 'View messages from Amazon and sellers',
      iconUrl:
        'https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/contact_us._CB659962323_.png',
      link: '/messages',
    },
    {
      title: 'Archived Orders',
      description: 'View and manage orders you have archived',
      iconUrl:
        'https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/order._CB660668735_.png',
      link: '/archived-orders',
    },
  ];

  return (
    <div className="account-main-wrapper">
      <UserProfile />

      <div className="account-grid">
        {accountCards.map((card, index) => (
          <Link
            to={card.link}
            key={index}
            className="account-card"
          >
            {card.iconUrl ? (
              <img
                src={card.iconUrl}
                alt={card.title}
                className="card-icon"
              />
            ) : (
              <div className="card-icon-symbol">
                {card.icon}
              </div>
            )}

            <div className="card-text">
              <h2>{card.title}</h2>
              <p>{card.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <hr className="account-divider" />

      {/* Amazon Quick Links Section */}
      <div className="account-sections-grid">

        {/* Ordering and browsing preferences */}
        <div className="account-section-column">
          <h3>Ordering and browsing preferences</h3>

          <ul>
            <li>
              <Link to="/orders">
                Leave seller feedback
              </Link>
            </li>

            <li>
              <Link to="/orders">
                Download order reports
              </Link>
            </li>

            <li>
              <Link to="/addresses">
                Manage address book
              </Link>
            </li>

            <li>
              <Link to="/account-preferences">
                Account Preferences
              </Link>
            </li>
          </ul>
        </div>

        {/* Digital content and devices */}
        <div className="account-section-column">
          <h3>Digital content and devices</h3>

          <ul>
            <li>
              <Link to="/manage-content">
                Manage Your Content and Devices
              </Link>
            </li>

            <li>
              <Link to="/digital-downloads">
                Digital Downloads
              </Link>
            </li>
          </ul>
        </div>

        {/* Subscriptions & Memberships */}
        <div className="account-section-column">
          <h3>Subscriptions & Memberships</h3>

          <ul>
            <li>
              <Link to="/prime">
                Prime membership
              </Link>
            </li>

            <li>
              <Link to="/subscribe-save">
                Subscribe &amp; Save
              </Link>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}