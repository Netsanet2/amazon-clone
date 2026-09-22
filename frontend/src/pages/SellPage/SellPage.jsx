// SellPage.jsx
import React, { useState } from 'react';
import './SellPage.css';
import { Link } from 'react-router-dom';

const SellPage = () => {
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  return (
    <div className="sell-page-container">
      
      {/* 1. Sub-Nav Bar */}
      <div className="sell-sub-nav">
        <h1 className="sell-brand">Sell with Amazon</h1>
        <div className="sell-promo">
          <span className="star-icon">✪</span> 
          <span>Get 10% back on your first $50,000 in branded sales. </span>
            {/* Updated route to match your incentives page */}
            <Link to="/sell/incentives" className="sell-learn-more">Learn more</Link>
        </div>
        <Link to="/register" className="sell-signup-btn">Sign up*</Link>
      </div>

      {/* 2. Hero Section */}
      <div className="sell-hero">
        <div className="sell-hero-text">
          <h2>Create an Amazon selling account</h2>
        </div>
        <div className="sell-hero-image-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80" 
            alt="Small business owner" 
            className="sell-hero-image"
          />
          <div className="sales-overlay">Total sales</div>
        </div>
      </div>

      {/* 3. Stats Banner */}
      <div className="sell-stats-banner">
        <p>In 2024, more than 55,000 independent sellers generated over $1 million in sales¹</p>
      </div>

      {/* 4. Interactive Quiz Section */}
      <div className="sell-quiz-section">
        <div className="sell-quiz-left">
          <div className="sparkle-icon">✨</div>
          <h2>Not sure where to begin?</h2>
          <p>Answer three questions to learn how you can start selling with Amazon.</p>
        </div>
        
        <div className="sell-quiz-right">
          <div className="quiz-card">
            <div className="quiz-header">
              <span>Question 1 of 3</span>
              <div className="quiz-progress-bar">
                <div className="quiz-progress-fill" style={{ width: '33%' }}></div>
              </div>
            </div>
            <h3>Where is your business based?</h3>
            <div className="quiz-options">
              <button 
                className={`quiz-option-btn ${selectedAnswer === 'us' ? 'selected' : ''}`}
                onClick={() => handleAnswer('us')}
              >
                In the US
              </button>
              <button 
                className={`quiz-option-btn ${selectedAnswer === 'intl' ? 'selected' : ''}`}
                onClick={() => handleAnswer('intl')}
              >
                Outside the US
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Why Sell Section */}
      <div className="sell-why-section">
        <div className="sell-why-left">
          <h2>Why create an Amazon selling account?</h2>
          <p className="sell-why-desc">
            By selling with Amazon, you can put your brand in front of millions of customers across the globe in a store they know and trust. Here are a few other reasons to consider selling with Amazon.
          </p>
          
          <div className="feature-item">
            <div className="feature-icon">🛡</div>
            <div className="feature-text">
              <h4>Sell with a brand customers trust</h4>
              <p>In 2023, Amazon was ranked the most trusted brand by US customers. Selling with Amazon means reaching millions of customers and tapping into a trusted shopping experience.</p>
              <a href="#stats" className="feature-link">Explore Amazon selling stats ↗️</a>
              </div>
          </div>
        </div>
        <div className="sell-why-right">
          <div className="testimonial-card">
            <span className="testimonial-brand">DIASPORA CO.</span>
            <p className="testimonial-quote">
              "I trusted that there was a community out there that cared, and to whom we mattered. All we needed to do was find them."
            </p>
            <div className="testimonial-author">
              <img 
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80" 
                alt="Sana Javeri Kadri" 
              />
              <div>
                <h5>Sana Javeri Kadri</h5>
                <p>Founder & Chief Executive Officer</p>
              </div>
            </div>
            <a href="#story" className="testimonial-link">See Sana's story ↗️</a>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SellPage;