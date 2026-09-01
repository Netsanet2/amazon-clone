import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import CartItem from "../../components/CartItem/CartItem";

function Cart() {
  const { cartItems, savedItems, moveToCart } = useCart();

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
    <div className="min-h-screen bg-[#eaeded] py-8">
      <div className="mx-auto max-w-7xl px-4">

        {/* PAGE HEADER */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-normal text-gray-900">
              Shopping Cart
            </h1>

            {cartItems.length > 0 && (
              <p className="mt-1 text-sm text-gray-600">
                {itemCount} item{itemCount !== 1 ? "s" : ""} in your cart
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* LEFT SIDE */}
          <div className="space-y-6 lg:col-span-2">

            {/* CART ITEMS */}
            {cartItems.length > 0 ? (
              <div className="overflow-hidden rounded-lg bg-white shadow-sm">

                {/* CART HEADER */}
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                  <h2 className="text-xl font-medium text-gray-900">
                    Cart Items
                  </h2>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                    {itemCount} item{itemCount !== 1 ? "s" : ""}
                  </span>
                </div>

                {/* PRODUCTS */}
                <div className="p-6">
                  <CartItem />
                </div>

                {/* FREE SHIPPING MESSAGE */}
                {subtotal >= 50 && (
                  <div className="border-t border-gray-200 bg-green-50 px-6 py-4">
                    <p className="text-sm font-medium text-green-700">
                      ✓ You qualify for FREE shipping!
                    </p>
                  </div>
                )}

              </div>
            ) : (
              /* EMPTY CART */
              <div className="rounded-lg bg-white p-12 text-center shadow-sm">

                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 text-5xl">
                  🛒
                </div>

                <h2 className="mt-6 text-2xl font-medium text-gray-900">
                  Your Amazon Cart is empty
                </h2>

                <p className="mt-2 text-gray-600">
                  Add products to your cart to see them here.
                </p>

                <Link
                  to="/products"
                  className="mt-6 inline-block rounded-full bg-[#ffd814] px-8 py-3 font-medium text-gray-900 shadow-sm transition hover:bg-[#f7ca00]"
                >
                  Continue Shopping
                </Link>

              </div>
            )}

            {/* SAVED FOR LATER */}
            {savedItems.length > 0 && (
              <div className="overflow-hidden rounded-lg bg-white shadow-sm">

                <div className="border-b border-gray-200 px-6 py-4">
                  <h2 className="text-xl font-medium text-gray-900">
                    Saved for Later
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Items you've saved for another time
                  </p>
                </div>

                <div className="px-6">

                  {savedItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col gap-4 border-b border-gray-200 py-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
                    >

                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {item.name}
                        </h3>

                        <p className="mt-1 text-lg font-bold text-gray-900">
                          ${Number(item.price).toFixed(2)}
                        </p>
                      </div>

                      <button
                        onClick={() => moveToCart(item.id)}
                        className="w-fit rounded border border-gray-400 bg-white px-4 py-2 text-sm font-medium text-gray-800 transition hover:bg-gray-100"
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
          <div className="h-fit overflow-hidden rounded-lg bg-white shadow-sm">

            <div className="border-b border-gray-200 px-6 py-5">
              <h2 className="text-xl font-medium text-gray-900">
                Order Summary
              </h2>
            </div>

            <div className="space-y-4 px-6 py-5">

              {/* SUBTOTAL */}
              <div className="flex justify-between text-sm text-gray-700">
                <span>
                  Subtotal ({itemCount} item{itemCount !== 1 ? "s" : ""})
                </span>

                <span className="font-medium">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              {/* SHIPPING */}
              <div className="flex justify-between text-sm text-gray-700">
                <span>
                  Shipping
                </span>

                <span className="font-medium">
                  {shipping === 0
                    ? "FREE"
                    : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              {/* SAVINGS */}
              <div className="flex justify-between text-sm text-green-700">
                <span>
                  Savings
                </span>

                <span className="font-medium">
                  -${savings.toFixed(2)}
                </span>
              </div>

              {/* TOTAL */}
              <div className="border-t border-gray-200 pt-4">

                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>
                    Order Total
                  </span>

                  <span>
                    ${total.toFixed(2)}
                  </span>
                </div>

              </div>

              {/* SAVINGS MESSAGE */}
              {savings > 0 && (
                <div className="rounded-md bg-green-50 p-3">
                  <p className="text-sm font-medium text-green-700">
                    You saved ${savings.toFixed(2)} on this order.
                  </p>
                </div>
              )}

              {/* CHECKOUT */}
              {cartItems.length > 0 ? (
                <Link
                  to="/checkout"
                  className="block w-full rounded-full bg-[#ffd814] px-4 py-3 text-center font-medium text-gray-900 shadow-sm transition hover:bg-[#f7ca00]"
                >
                  Proceed to Checkout
                </Link>
              ) : (
                <button
                  disabled
                  className="w-full cursor-not-allowed rounded-full bg-gray-300 px-4 py-3 font-medium text-gray-500"
                >
                  Proceed to Checkout
                </button>
              )}

              <div className="flex items-center justify-center gap-2 pt-1 text-xs text-gray-500">
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