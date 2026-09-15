import React, { useState } from 'react';
import './ProductCard.css';
import { Link } from 'react-router-dom';

// A bulletproof, lightweight base64 SVG hat visual that never relies on the internet to load
const fallbackHatSVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="%23333"><path d="M50 20c-15 0-25 10-25 25v10c0 3 2 5 5 5h40c3 0 5-2 5-5V45c0-15-10-25-25-25zm-25 35c-15 2-15 15 0 15h60c15 0 15-13 0-15H25z"/></svg>`;

const ProductCard = ({ product }) => {
  const [imgSrc, setImgSrc] = useState(product.image);
  const title = product.title || product.name;

  const handleImageError = () => {
    // Determine the backup depending on the product title. If "Hats", use the baseline SVG inline code.
    if (title.toLowerCase().includes('hat')) {
      setImgSrc(fallbackHatSVG);
    } else {
      // General baseline item photo backup
      setImgSrc('https://upload.wikimedia.org/wikipedia/commons/1/14/Product_sample.jpg');
    }
  };

  return (
    <Link to={product.id ? `/product/${product.id}` : '#'} className="product-card">
      <div className="product-card-img-wrapper">
        {imgSrc ? (
          <img 
            src={imgSrc} 
            alt={title}
            onError={handleImageError} 
            loading="lazy"
          />
        ) : (
          <i className={`fas ${product.icon}`}></i>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-name">{title}</h3>
        {product.brand && <p className="product-brand">{product.brand}</p>}
        {product.rating && <div className="product-rating">⭐ {product.rating}</div>}
        {product.price !== undefined && <p className="product-price">${Number(product.price).toFixed(2)}</p>}
        {product.availability && <p className={product.availability === 'In Stock' ? 'product-available' : 'product-unavailable'}>{product.availability}</p>}
      </div>
    </Link>
  );
};

export default ProductCard;