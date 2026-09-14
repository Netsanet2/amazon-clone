import Rating from "../Rating/Rating";
import "./Reviews.css";

function Reviews({ product }) {

  const reviews = [
    {
      id: 1,
      name: "John Smith",
      rating: 5,
      title: "Excellent product",
      text:
        "The quality is excellent. It works exactly as described and arrived quickly."
    },
    {
      id: 2,
      name: "Sarah Johnson",
      rating: 4,
      title: "Very good product",
      text:
        "I am happy with this purchase. The quality is good and the product feels durable."
    },
    {
      id: 3,
      name: "Michael Brown",
      rating: 5,
      title: "Worth the money",
      text:
        "Great product for the price. I would definitely recommend it to others."
    }
  ];

  return (
    <section className="reviews-section">

      <h2>Customer reviews</h2>

      {/* Overall Rating */}

      <div className="overall-rating">

        <div className="big-rating">
          {product.rating.toFixed(1)}
          <span> out of 5</span>
        </div>

        <Rating
          rating={product.rating}
          reviews={product.reviews}
        />

      </div>

      <div className="review-divider"></div>

      {/* Individual Reviews */}

      <h3 className="top-reviews">
        Top customer reviews
      </h3>

      {reviews.map((review) => (

        <article
          className="customer-review"
          key={review.id}
        >

          <div className="customer-name">
            👤 {review.name}
          </div>

          <div className="review-rating-row">

            <Rating
              rating={review.rating}
              reviews={0}
              showReviews={false}
            />

            <strong>
              {review.title}
            </strong>

          </div>

          <p>
            {review.text}
          </p>

          <div className="verified-purchase">
            ✓ Verified Purchase
          </div>

          <div className="review-helpful">
            Helpful
          </div>

        </article>

      ))}

    </section>
  );
}

export default Reviews;