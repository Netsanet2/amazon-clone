import { useCart } from "../../context/CartContext";

function CartItem() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
  } = useCart();

  const product = cartItems[0];

  if (!product) {
    return <p>Your cart is empty.</p>;
  }

  const handleIncrease = () => {
    updateQuantity(product.id, product.quantity + 1);
  };

  const handleDecrease = () => {
    if (product.quantity > 1) {
      updateQuantity(product.id, product.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  return (
    <div>
      <img
        src={product.image}
        alt={product.name}
        width="150"
      />

      <div>
        <h2>{product.name}</h2>
        <p>Price: ${product.price}</p>

        <div>
          <button onClick={handleDecrease}>-</button>
          <span>{product.quantity}</span>
          <button onClick={handleIncrease}>+</button>
        </div>

        <button onClick={handleRemove}>Remove</button>
        <button>Save for Later</button>
        <button>Move to Wishlist</button>
      </div>
    </div>
  );
}

export default CartItem;