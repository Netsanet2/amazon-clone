import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-card-img-wrapper">
        {product.image ? (
          <img src={product.image} alt={product.title} />
        ) : (
          <i className={`fas ${product.icon}`}></i>
        )}
      </div>
      <h3>{product.title}</h3>
    </div>
  );
};

export default ProductCard;