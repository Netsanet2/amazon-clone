import "./AddToCart.css";

function AddToCart({ onClick }) {
  return (
    <button
      className="add-to-cart"
      onClick={onClick}
    >
      Add to Cart
    </button>
  );
}

export default AddToCart;