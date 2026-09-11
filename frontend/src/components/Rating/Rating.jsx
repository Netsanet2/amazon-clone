import React from 'react';
import './Rating.css';

const Rating = ({ value, max = 5 }) => {
  const fullStars = Math.floor(value);
  const halfStar = value % 1 >= 0.5;
  const emptyStars = max - fullStars - (halfStar ? 1 : 0);

  return (
    <span className="rating">
      {[...Array(fullStars)].map((_, i) => (
        <i key={`full-${i}`} className="fas fa-star star-full"></i>
      ))}
      {halfStar && <i className="fas fa-star-half-alt star-half"></i>}
      {[...Array(emptyStars)].map((_, i) => (
        <i key={`empty-${i}`} className="far fa-star star-empty"></i>
      ))}
    </span>
  );
};

export default Rating;
