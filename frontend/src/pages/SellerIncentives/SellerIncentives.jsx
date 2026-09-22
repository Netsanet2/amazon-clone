import React from "react";
import "./SellerIncentives.css";

export default function SellerIncentives() {
  return (
    <div className="incentives-container">
      {/* 1. Top Banner */}
      <div className="top-banner">
        <span>
          ✪ Unlock $50K in new seller credits, bonuses, and exclusive benefits.
          <a href="#learn" className="top-banner-link">
            Learn how
          </a>
        </span>
      </div>

      {/* 2. Simplified Nav Header */}
      <header className="navbar">
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">
            <span className="brand-amazon">amazon</span>
            <span className="brand-sell">sell</span>
          </a>

          {/* Simplified Menu Links */}
          <nav className="nav-links">
            <a href="#overview" className="nav-link">
              Overview
            </a>
            <a href="#pricing" className="nav-link">
              Pricing
            </a>
            <a href="#resources" className="nav-link">
              Resources
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="nav-actions">
            <button className="btn-login">Log in</button>
            <button className="btn-start">Start selling</button>
          </div>
        </div>
      </header>

      {/* 3. Hero Content */}
      <main className="hero-section">
        <div className="hero-left">
          <h1 className="hero-heading">
            Get over <br />
            <span className="highlight-text">$50,000</span> <br />
            in incentives
          </h1>
          <p className="hero-description">
            New sellers can save thousands with credits, bonuses, and exclusive
            benefits.
          </p>
          <button className="btn-cta">Sign up today</button>
        </div>

        <div className="hero-right">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
            alt="Seller"
            className="hero-img"
          />
        </div>
      </main>
    </div>
  );
}