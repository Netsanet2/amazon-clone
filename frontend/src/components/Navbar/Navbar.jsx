import React, { useState } from 'react';
import amazonLogo from '../../assets/amazon-logo.png';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import Sidebar from '../Sidebar/Sidebar';
import './Navbar.css';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header>
        <div className="nav-top">
          {/* Logo */}
          <div className="nav-logo">
            <Link to="/">
              <img src={amazonLogo} alt="Amazon" className="logo-image" />
            </Link>
          </div>

          {/* Deliver to */}
          <div className="nav-deliver">
            <i className="fas fa-map-marker-alt loc-icon"></i>
            <div>
              <div className="deliver-text">Deliver to</div>
              <div className="deliver-country">Ethiopia</div>
            </div>
          </div>

          {/* Search Bar */}
          <SearchBar />

          {/* Language */}
          <div className="nav-language">
            <span className="flag-icon">🇺🇸</span>
            <span className="lang-text">EN</span>
            <i className="fas fa-caret-down lang-caret"></i>
          </div>

          {/* Account & Lists */}
          <div className="nav-account">
            <span className="line1">Hello, sign in</span>
            <span className="line2">Account & Lists <i className="fas fa-caret-down"></i></span>
          </div>

          {/* Returns & Orders */}
          <div className="nav-returns">
            <span className="line1">Returns</span>
            <span className="line2">& Orders</span>
          </div>

          {/* Cart */}
          <div className="nav-cart">
            <span className="cart-count">0</span>
            <i className="fas fa-shopping-cart cart-icon"></i>
            <span className="cart-text">Cart</span>
          </div>
        </div>
      </header>

      {/* Secondary Nav */}
      <nav className="nav-secondary">
        <span className="all-menu" onClick={() => setSidebarOpen(true)}>
          <i className="fas fa-bars"></i> All
        </span>
        <span className="nav-link">Today's Deals</span>
        <span className="nav-link">Customer Service</span>
        <span className="nav-link">Registry</span>
        <span className="nav-link">Gift Cards</span>
        <span className="nav-link">Sell</span>
        <span className="nav-link sale">Labor Day Sale</span>
      </nav>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Navbar;
