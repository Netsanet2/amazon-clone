import React from 'react';
import Rating from '../Rating/Rating';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  // Use the product data passed in, or fallback to placeholders
  const { title = "Sample Pro <i className={fas`}`{icon} product-icon}></i>duct", subtitle = "Sample Category", price = 19.99, rating = 4.5, icon = "fa-box" } = product || {};

  return (
    <div className="product-card">
    
      <div className="product-image-container">
       <i className={`fas ${icon} product-icon`}></i>
      </div>
  
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <p className="product-sub">{subtitle}</p>
        
        <div className="product-rating">
          <Rating value={rating} />
          <span className="rating-count">(1,234)</span>
        </div>
        
        <div className="product-price">
          <span className="currency">$</span>
          <span className="dollars">{price}</span>
        </div> {/* <-- THIS CLOSING TAG WAS MISSING */}
      </div>
      
      <button className="add-to-cart-btn" onClick={() => onAddToCart && onAddToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;