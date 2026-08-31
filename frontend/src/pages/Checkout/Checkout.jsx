import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
function Checkout() {
const { cartItems, clearCart } = useCart();
const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 5 : 0;
  const savings = subtotal * 0.1;
  const total = subtotal + shipping - savings;

  return (
    <div className="min-h-screen bg-[#eaeded] py-8">
      <div className="mx-auto max-w-7xl px-4">

        <h1 className="mb-8 text-3xl font-normal text-gray-900">
          Checkout
        </h1>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Left Side */}
          <div className="space-y-6 lg:col-span-2">

            {/* Delivery Address */}
            <div className="rounded-sm bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-medium">
                1. Delivery Address
              </h2>

              <div className="rounded border border-gray-300 p-4">
                <p className="font-semibold">
                  Samrawit Asmelash
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  Addis Ababa, Ethiopia
                </p>

                <p className="text-sm text-gray-600">
                  Phone: +251 991870722
                </p>
              </div>
            </div>

            {/* Payment */}
            <div className="rounded-sm bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-medium">
                2. Payment Method
              </h2>

              <div className="space-y-3">
                <label className="flex cursor-pointer items-center gap-3 rounded border border-gray-300 p-4 hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    defaultChecked
                  />
                  <span>Cash on Delivery</span>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded border border-gray-300 p-4 hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                  />
                  <span>Bank Transfer</span>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded border border-gray-300 p-4 hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                  />
                  <span>Chapa</span>
                </label>
              </div>
            </div>

            {/* Items */}
            <div className="rounded-sm bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-xl font-medium">
                3. Review Your Items
              </h2>

              <div className="space-y-5">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border-b border-gray-200 pb-5"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-24 rounded object-contain"
                    />

                    <div className="flex-1">
                      <h3 className="font-medium">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>

                      <p className="mt-2 font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Order Summary */}
          <div className="h-fit rounded-sm bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-xl font-medium">
              Order Summary
            </h2>

            <div className="space-y-4 text-sm">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-green-700">
                <span>Savings</span>
                <span>-${savings.toFixed(2)}</span>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

            </div>

            <button
  onClick={() => {
    clearCart();
    navigate("/orders");
  }}
 
  className="mt-6 w-full rounded-full bg-[#ffd814] px-4 py-3 font-medium hover:bg-[#f7ca00]"
>
  Place Your Order
</button>

            <p className="mt-4 text-center text-xs text-gray-500">
              🔒 Secure checkout • Your payment information is protected
            </p>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Checkout;