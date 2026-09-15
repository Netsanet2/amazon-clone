import "./QuantitySelector.css";

function QuantitySelector({
  quantity,
  setQuantity,
  maxQuantity = 10
}) {

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className="quantity-area">

      <span className="quantity-label">
        Qty:
      </span>

      <div className="quantity-selector">

        <button
          onClick={decreaseQuantity}
          disabled={quantity <= 1}
        >
          −
        </button>

        <span>{quantity}</span>

        <button
          onClick={increaseQuantity}
          disabled={quantity >= maxQuantity}
        >
          +
        </button>

      </div>

    </div>
  );
}

export default QuantitySelector;