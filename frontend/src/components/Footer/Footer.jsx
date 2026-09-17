import { Link } from "react-router-dom";
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-col">
          <h4>Get to Know Us</h4>
          <Link to="/about-amazon">About Amazon</Link>
          
          <a href="#">Careers</a>
          <a href="#">Press Releases</a>
          <a href="#">Amazon Science</a>
        </div>
        <div className="footer-col">
          <h4>Connect with Us</h4>
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
        </div>
        <div className="footer-col">
          <h4>Make Money with Us</h4>
          <a href="#">Sell on Amazon</a>
          <a href="#">Become an Affiliate</a>
          <a href="#">Advertise Your Products</a>
        </div>
        <div className="footer-col">
          <h4>Let Us Help You</h4>
          <a href="#">Your Account</a>
          <a href="#">Returns Centre</a>
          <a href="#">100% Purchase Protection</a>
          <a href="#">Help</a>
        </div>
        <div className="footer-col">
          <h4>Shop by Category</h4>
          <a href="#">Laptops</a>
          <a href="#">PCs</a>
          <a href="#">Electronics</a>
          <a href="#">Home</a>
          <a href="#">Dogs</a>
          <a href="#">Cats</a>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-logo">amazon<span>.com</span></div>
        <p>&copy; 2026 Amazon.com, Inc. or its affiliates. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
