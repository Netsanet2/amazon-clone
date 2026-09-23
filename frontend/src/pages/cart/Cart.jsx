import { useCart } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CartItem from "../../components/CartItem/CartItem";
import "./Cart.css";

function Cart() {
  const { cartItems, savedItems, moveToCart } = useCart();
  const { loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    if (authLoading) {
      return;
    }

    // Always send the customer to the existing checkout route. The route's
    // ProtectedRoute redirects signed-out customers to login and preserves
    // /checkout as the destination after authentication.
    navigate("/checkout");
  };

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.quantity),
    0
  );

  const itemCount = cartItems.reduce(
    (total, item) => total + Number(item.quantity),
    0
  );

  const shipping =
    subtotal === 0 ? 0 : subtotal >= 50 ? 0 : 5;

  const savings = subtotal * 0.1;
  const total = subtotal + shipping - savings;

  return (
    <div className="cart-page">
      <div className="cart-container">

        {/* PAGE HEADER */}
        <div className="cart-header">
          <div>
            <h1 className="cart-title">
              Shopping Cart
            </h1>

            {cartItems.length > 0 && (
              <p className="cart-count-text">
                {itemCount} item{itemCount !== 1 ? "s" : ""} in your cart
              </p>
            )}
          </div>
        </div>

        <div className="cart-layout">

          {/* LEFT SIDE */}
          <div className="cart-left">

            {/* CART ITEMS */}
            {cartItems.length > 0 ? (
              <div className="cart-box">

                {/* CART HEADER */}
                <div className="cart-box-header">
                  <h2 className="cart-box-title">
                    Cart Items
                  </h2>

                  <span className="cart-item-count">
                    {itemCount} item{itemCount !== 1 ? "s" : ""}
                  </span>
                </div>

                {/* PRODUCTS */}
                <div className="cart-items-container">
                  <CartItem />
                </div>

                {/* FREE SHIPPING MESSAGE */}
                {subtotal >= 50 && (
                  <div className="free-shipping-message">
                    <p>
                      ✓ You qualify for FREE shipping!
                    </p>
                  </div>
                )}

              </div>
            ) : (
              /* EMPTY CART */
              <div className="empty-cart">

                <div className="empty-cart-icon">
                  🛒
                </div>

                <h2 className="empty-cart-title">
                  Your Amazon Cart is empty
                </h2>

                <p className="empty-cart-text">
                  Add products to your cart to see them here.
                </p>

                <Link
                  to="/products"
                  className="continue-shopping"
                >
                  Continue Shopping
                </Link>

              </div>
            )}

            {/* SAVED FOR LATER */}
            {savedItems.length > 0 && (
              <div className="cart-box">

                <div className="saved-header">
                  <h2 className="cart-box-title">
                    Saved for Later
                  </h2>

                  <p className="saved-description">
                    Items you've saved for another time
                  </p>
                </div>

                <div className="saved-items">

                  {savedItems.map((item) => (
                    <div
                      key={item.id}
                      className="saved-item"
                    >

                      <div>
                        <h3 className="saved-item-name">
                          {item.name}
                        </h3>

                        <p className="saved-item-price">
                          ${Number(item.price).toFixed(2)}
                        </p>
                      </div>

                      <button
                        onClick={() => moveToCart(item.id)}
                        className="move-to-cart"
                      >
                        Move to Cart
                      </button>

                    </div>
                  ))}

                </div>
              </div>
            )}

          </div>

          {/* RIGHT SIDE - ORDER SUMMARY */}
          <div className="order-summary">

            <div className="order-summary-header">
              <h2>
                Order Summary
              </h2>
            </div>

            <div className="order-summary-content">

              {/* SUBTOTAL */}
              <div className="summary-row">
                <span>
                  Subtotal ({itemCount} item{itemCount !== 1 ? "s" : ""})
                </span>

                <span>
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              {/* SHIPPING */}
              <div className="summary-row">
                <span>
                  Shipping
                </span>

                <span>
                  {shipping === 0
                    ? "FREE"
                    : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              {/* SAVINGS */}
              <div className="summary-row savings-row">
                <span>
                  Savings
                </span>

                <span>
                  -${savings.toFixed(2)}
                </span>
              </div>

              {/* TOTAL */}
              <div className="order-total">

                <span>
                  Order Total
                </span>

                <span>
                  ${total.toFixed(2)}
                </span>

              </div>

              {/* SAVINGS MESSAGE */}
              {savings > 0 && (
                <div className="savings-message">
                  You saved ${savings.toFixed(2)} on this order.
                </div>
              )}

              {/* CHECKOUT */}
              {cartItems.length > 0 ? (
                <button
                  type="button"
                  onClick={handleProceedToCheckout}
                  disabled={authLoading}
                  className="checkout-button"
                >
                  {authLoading ? "Loading..." : "Proceed to Checkout"}
                </button>
              ) : (
                <button
                  disabled
                  className="checkout-button"
                >
                  Proceed to Checkout
                </button>
              )}

              <div className="secure-checkout">
                <span>🔒</span>
                <span>Secure checkout</span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Cart;