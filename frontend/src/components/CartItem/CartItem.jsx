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
          className="border-b border-gray-200 pb-6 last:border-b-0"
        >
          <div className="flex flex-col gap-5 sm:flex-row">

            {/* Product Image */}
            <div className="flex h-40 w-40 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-3">
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
                High-quality product with excellent performance and
                reliable features.
              </p>

              {/* Seller */}
              {item.seller && (
                <p className="mt-2 text-sm text-gray-600">
                  Sold by:{" "}
                  <span className="font-medium text-gray-900">
                    {item.seller}
                  </span>
                </p>
              )}

              {/* Stock */}
              {item.stock && (
                <p className="mt-3 text-sm font-medium text-green-700">
                  ✓ {item.stock}
                </p>
              )}

              {/* Delivery */}
              {item.delivery && (
                <p className="mt-1 text-sm text-gray-600">
                  🚚 {item.delivery}
                </p>
              )}

              {/* Price */}
              <p className="mt-3 text-2xl font-bold text-gray-900">
                ${Number(item.price).toFixed(2)}
              </p>

              {/* Quantity + Actions */}
              <div className="mt-5 flex flex-wrap items-center gap-3">

                {/* Quantity */}
                <div className="flex items-center overflow-hidden rounded-full border border-gray-400 bg-white shadow-sm">

                  <button
                    type="button"
                    onClick={() => decreaseQuantity(item.id)}
                    className="px-4 py-2 text-lg font-bold text-gray-800 transition hover:bg-gray-100"
                  >
                    −
                  </button>

                  <span className="min-w-12 border-x border-gray-300 px-4 py-2 text-center font-semibold text-gray-900">
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => increaseQuantity(item.id)}
                    className="px-4 py-2 text-lg font-bold text-gray-800 transition hover:bg-gray-100"
                  >
                    +
                  </button>

                </div>

                {/* Delete */}
                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="rounded px-3 py-2 text-sm text-blue-700 transition hover:bg-gray-100 hover:text-blue-900 hover:underline"
                >
                  Delete
                </button>

                {/* Save for Later */}
                <button
                  type="button"
                  onClick={() => saveForLater(item.id)}
                  className="rounded px-3 py-2 text-sm text-blue-700 transition hover:bg-gray-100 hover:text-blue-900 hover:underline"
                >
                  Save for Later
                </button>

              </div>
            </div>

            {/* Item Total */}
            <div className="min-w-28 text-left sm:text-right">

              <p className="text-sm text-gray-500">
                Item total
              </p>

              <p className="mt-1 text-xl font-bold text-gray-900">
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