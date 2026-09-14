import "./BuyNow.css";

function BuyNow({ onClick }) {
  return (
    <button
      className="buy-now"
      onClick={onClick}
    >
      Buy Now
    </button>
  );
}

export default BuyNow;