import { useCart } from "../../context/CartContext";

function CartItem() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    saveForLater,
  } = useCart();

  return (
    <div className="space-y-6">
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="border-b border-gray-200 pb-6"
        >
          <div className="flex flex-col gap-5 sm:flex-row">

            {/* Product Image */}
            <div className="flex h-40 w-40 shrink-0 items-center justify-center rounded-lg bg-gray-50 p-2">
  <img
    src={item.image}
    alt={item.name}
    className="h-full w-full object-contain"
  />
</div>

            {/* Product Information */}
            <div className="flex-1">

              <h2 className="text-xl font-medium text-gray-900">
                {item.name}
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                Wireless headphones with high-quality sound
              </p>

              {/* Seller */}
              <p className="mt-2 text-sm text-gray-600">
                Sold by:{" "}
                <span className="font-medium text-gray-900">
                  {item.seller}
                </span>
              </p>

              {/* Stock */}
              <p className="mt-3 text-sm font-medium text-green-700">
                ✓ {item.stock}
              </p>

              {/* Delivery */}
              <p className="mt-1 text-sm text-gray-600">
                🚚 {item.delivery}
              </p>

              {/* Price */}
              <p className="mt-3 text-2xl font-bold text-gray-900">
                ${Number(item.price).toFixed(2)}
              </p>

              {/* Quantity + Actions */}
              <div className="mt-5 flex flex-wrap items-center gap-3">

                <div className="flex overflow-hidden rounded-lg border border-gray-300">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="px-4 py-2 text-lg font-bold hover:bg-gray-100"
                  >
                    −
                  </button>

                  <span className="border-x border-gray-300 px-5 py-2 font-semibold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="px-4 py-2 text-lg font-bold hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="border-l border-gray-300 pl-3 text-sm text-blue-700 hover:text-blue-900 hover:underline"
                >
                  Delete
                </button>

                <button
                  onClick={() => saveForLater(item.id)}
                  className="border-l border-gray-300 pl-3 text-sm text-blue-700 hover:text-blue-900 hover:underline"
                >
                  Save for Later
                </button>

              </div>
            </div>

            {/* Item Total */}
            <div className="text-right">
              <p className="text-sm text-gray-500">
                Item total
              </p>

              <p className="mt-1 text-xl font-bold text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}

export default CartItem;