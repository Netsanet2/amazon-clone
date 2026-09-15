import { useCart } from "../../context/CartContext";
import "./CartItem.css";

function CartItem() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    saveForLater,
  } = useCart();

  return (
    <div className="cart-item-list">
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="cart-item"
        >
          <div className="cart-item-content">

            {/* Product Image */}
            <div className="cart-product-image">
              <img
                src={item.image}
                alt={item.name}
              />
            </div>

            {/* Product Information */}
            <div className="cart-product-info">

              <h2 className="cart-product-name">
                {item.name}
              </h2>

              <p className="cart-product-description">
                High-quality product with excellent performance and
                reliable features.
              </p>

              {/* Seller */}
              {item.seller && (
                <p className="cart-seller">
                  Sold by:{" "}
                  <strong>
                    {item.seller}
                  </strong>
                </p>
              )}

              {/* Stock */}
              {item.stock && (
                <p className="cart-stock">
                  ✓ {item.stock}
                </p>
              )}

              {/* Delivery */}
              {item.delivery && (
                <p className="cart-delivery">
                  🚚 {item.delivery}
                </p>
              )}

              {/* Price */}
              <p className="cart-product-price">
                ${Number(item.price).toFixed(2)}
              </p>

              {/* Quantity + Actions */}
              <div className="cart-actions">

                {/* Quantity */}
                <div className="quantity-control">

                  <button
                    type="button"
                    onClick={() => decreaseQuantity(item.id)}
                    className="quantity-button"
                  >
                    −
                  </button>

                  <span className="quantity-value">
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => increaseQuantity(item.id)}
                    className="quantity-button"
                  >
                    +
                  </button>

                </div>

                {/* Delete */}
                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="cart-action-button"
                >
                  Delete
                </button>

                {/* Save for Later */}
                <button
                  type="button"
                  onClick={() => saveForLater(item.id)}
                  className="cart-action-button"
                >
                  Save for Later
                </button>

              </div>
            </div>

            {/* Item Total */}
            <div className="cart-item-total">

              <p className="cart-item-total-label">
                Item total
              </p>

              <p className="cart-item-total-price">
                $
                {(
                  Number(item.price) * Number(item.quantity)
                ).toFixed(2)}
              </p>

            </div>

          </div>
        </div>
      ))}
    </div>
  );
}

export default CartItem;