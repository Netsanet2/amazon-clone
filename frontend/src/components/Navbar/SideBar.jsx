import React from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>
      <aside className={`sidebar-panel ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2><i className="fas fa-user-circle"></i> Hello, Sign in</h2>
          <span className="sidebar-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </span>
        </div>
        <div className="sidebar-section">
          <h3>Your Lists</h3>
          <ul>
            <li><i className="fas fa-list"></i> Find a list of regularly used items</li>
            <li><i className="fas fa-book"></i> Your Saved Books</li>
          </ul>
        </div>
        <div className="sidebar-section">
          <h3>Your Account</h3>
          <ul>
            <li><i className="fas fa-user"></i> Account</li>
            <li><i className="fas fa-truck"></i> Orders</li>
            <li><i className="fas fa-thumbs-up"></i> Recommendations</li>
            <li><i className="fas fa-gift"></i> Rewards</li>
            <li><i className="fas fa-sliders-h"></i> Shopping preferences</li>
            <li><i className="fas fa-clock"></i> Watch History</li>
            <li><i className="fas fa-video"></i> Video Purchases &amp; Rewards</li>
            <li><i className="fas fa-robot"></i> Kindle Unlimited</li>
            <li><i className="fas fa-tablet"></i> Content &amp; Devices</li>
            <li><i className="fas fa-cog"></i> Subscriptions &amp; More</li>
            <li><i className="fas fa-bug"></i> MemberBugs &amp; Subscriptions</li>
            <li><i className="fas fa-music"></i> Music Library</li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
