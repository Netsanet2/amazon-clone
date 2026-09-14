import "./Rating.css";

function Rating({ rating, reviews, showReviews = true }) {

  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(
        <span className="rating-star" key={i}>
          ★
        </span>
      );
    } else {
      stars.push(
        <span className="rating-star-empty" key={i}>
          ★
        </span>
      );
    }
  }

  return (
    <div className="rating">

      <span className="rating-value">
        {rating.toFixed(1)}
      </span>

      <span className="rating-stars">
        {stars}
      </span>

      {showReviews && (
        <span className="rating-reviews">
          {reviews.toLocaleString()} ratings
        </span>
      )}

    </div>
  );
}

export default Rating;