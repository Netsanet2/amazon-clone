import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import CartItem from "../../components/CartItem/CartItem";
function Cart() {

  const { cartItems, savedItems, moveToCart } = useCart();
const navigate = useNavigate();
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal === 0 ? 0 : subtotal >= 50 ? 0 : 5;
  console.log("SUBTOTAL:", subtotal, "SHIPPING:", shipping);
  const savings = subtotal * 0.1;
  const total = subtotal + shipping - savings;

  return (
    <div className="min-h-screen bg-[#eaeded] py-8">
      <div className="mx-auto max-w-7xl px-4">

        <h1 className="mb-6 text-3xl font-normal text-gray-900">
          Shopping Cart
        </h1>

        <div className="grid gap-6 lg:grid-cols-3">

          <div className="lg:col-span-2">

            {cartItems.length > 0 ? (
              <div className="rounded-sm bg-white p-6 shadow-sm">

                <div className="mb-5 flex items-center justify-between border-b border-gray-200 pb-4">
                  <h2 className="text-xl font-medium">
                    <CartItem items={cartItems} />
                  </h2>

                  <span className="text-sm text-gray-500">
                    {cartItems.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )} item(s)
                  </span>
                </div>

                <CartItem />
              </div>
            ) : (
              <div className="rounded-sm bg-white p-10 text-center shadow-sm">
                <div className="text-6xl">🛒</div>

                <h2 className="mt-4 text-2xl font-medium text-gray-900">
                  Your Amazon Cart is empty
                </h2>

                <p className="mt-2 text-gray-600">
                  Add products to your cart to see them here.
                </p>
<button
  type="button"
  onClick={() => window.location.href = "/products"}
  className="mt-6 rounded-full bg-[#ffd814] px-8 py-3 font-medium hover:bg-[#f7ca00]"
>
  Continue Shopping
</button>
              </div>
            )}

            {savedItems.length > 0 && (
              <div className="mt-6 rounded-sm bg-white p-6 shadow-sm">
                <h2 className="mb-5 text-xl font-medium">
                  Saved for Later
                </h2>

                {savedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b border-gray-200 py-4"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {item.name}
                      </h3>

                      <p className="mt-1 font-bold">
                        ${Number(item.price).toFixed(2)}
                      </p>
                    </div>

                    <button
                      onClick={() => moveToCart(item.id)}
                      className="text-sm text-blue-700 hover:underline"
                    >
                      Move to Cart
                    </button>
                  </div>
                ))}
              </div>
            )}

          </div>

          <div className="h-fit rounded-sm bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-xl font-medium">
              Order Summary
            </h2>

            <div className="space-y-4 text-sm">
<div className="flex justify-between text-gray-700">
  <span>Shipping</span>
  <span>
    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
  </span>
</div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-green-700">
                <span>Savings</span>
                <span>-${savings.toFixed(2)}</span>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <p className="mt-2 text-sm font-medium text-green-700">
                  You saved ${savings.toFixed(2)} on this order
                </p>
              </div>

            </div>
<Link
  to="/checkout"
  className="mt-6 block w-full rounded-full bg-[#ffd814] px-4 py-3 text-center font-medium text-gray-900 hover:bg-[#f7ca00]"
>
  Proceed to Checkout
</Link>

          </div>

        </div>
      </div>
    </div>
  );
}
export default Cart;