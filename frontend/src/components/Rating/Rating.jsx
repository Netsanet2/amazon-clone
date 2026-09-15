import "./Rating.css";

function Rating({ value, rating = value ?? 0, reviews, max = 5, showReviews = true }) {
  const numericRating = Number(rating) || 0;
  const fullStars = Math.floor(numericRating);
  const hasHalfStar = numericRating % 1 >= 0.5;
  const emptyStars = Math.max(0, max - fullStars - (hasHalfStar ? 1 : 0));

  return (
    <span className="rating">
      <span className="rating-value">{numericRating.toFixed(1)}</span>
      <span className="rating-stars">
        {[...Array(fullStars)].map((_, index) => <span className="rating-star" key={`full-${index}`}>★</span>)}
        {hasHalfStar && <span className="rating-star" aria-label="half star">★</span>}
        {[...Array(emptyStars)].map((_, index) => <span className="rating-star-empty" key={`empty-${index}`}>★</span>)}
      </span>
      {showReviews && reviews !== undefined && <span className="rating-reviews">{Number(reviews).toLocaleString()} ratings</span>}
    </span>
  );
}

export default Rating;
