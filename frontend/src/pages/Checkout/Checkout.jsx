import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  // Customer information
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  // Payment method
  const [paymentMethod, setPaymentMethod] =
    useState("Cash on Delivery");

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 5 : 0;
  const savings = subtotal * 0.1;
  const total = subtotal + shipping - savings;

  const handlePlaceOrder = () => {
    // Check delivery information
    if (!fullName || !phone || !city || !address) {
      alert("Please complete your delivery information.");
      return;
    }

    // Check cart
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    // Create order
    const order = {
      orderNumber: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString(),

      customerName: fullName,
      phone: phone,
      city: city,
      address: address,

      paymentMethod: paymentMethod,

      items: cartItems,

      subtotal: subtotal,
      shipping: shipping,
      savings: savings,
      total: total,

      status: "Preparing for shipment",
    };

    // Save order in browser
    localStorage.setItem(
      "lastOrder",
      JSON.stringify(order)
    );

    // Clear cart
    clearCart();

    // Go to Orders
    navigate("/orders");
  };

  return (
    <div className="min-h-screen bg-[#eaeded] py-8">
      <div className="mx-auto max-w-7xl px-4">

        <h1 className="mb-8 text-3xl font-normal text-gray-900">
          Checkout
        </h1>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* LEFT SIDE */}
          <div className="space-y-6 lg:col-span-2">

            {/* DELIVERY ADDRESS */}
            <div className="rounded-sm bg-white p-6 shadow-sm">

              <h2 className="mb-4 text-xl font-medium">
                1. Delivery Address
              </h2>

              <div className="space-y-4">

                {/* Full Name */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) =>
                      setFullName(e.target.value)
                    }
                    placeholder="Enter your full name"
                    className="w-full rounded border border-gray-300 p-3 outline-none focus:border-blue-500"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                    placeholder="Enter your phone number"
                    className="w-full rounded border border-gray-300 p-3 outline-none focus:border-blue-500"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    City
                  </label>

                  <select
                    value={city}
                    onChange={(e) =>
                      setCity(e.target.value)
                    }
                    className="w-full rounded border border-gray-300 p-3 outline-none focus:border-blue-500"
                  >
                    <option value="" disabled>
                      Select your city
                    </option>

                    <option value="Addis Ababa">
                      Addis Ababa
                    </option>

                    <option value="Mekelle">
                      Mekelle
                    </option>

                    <option value="Dire Dawa">
                      Dire Dawa
                    </option>

                    <option value="Bahir Dar">
                      Bahir Dar
                    </option>

                    <option value="Gondar">
                      Gondar
                    </option>

                    <option value="Hawassa">
                      Hawassa
                    </option>

                    <option value="Jimma">
                      Jimma
                    </option>

                    <option value="Adama">
                      Adama
                    </option>

                    <option value="Dessie">
                      Dessie
                    </option>

                    <option value="Jijiga">
                      Jijiga
                    </option>

                    <option value="Shashamane">
                      Shashamane
                    </option>

                    <option value="Arba Minch">
                      Arba Minch
                    </option>

                    <option value="Harar">
                      Harar
                    </option>

                    <option value="Bishoftu">
                      Bishoftu
                    </option>

                    <option value="Nekemte">
                      Nekemte
                    </option>

                    <option value="Debre Birhan">
                      Debre Birhan
                    </option>

                    <option value="Debre Markos">
                      Debre Markos
                    </option>

                    <option value="Woldiya">
                      Woldiya
                    </option>

                    <option value="Axum">
                      Axum
                    </option>

                    <option value="Adigrat">
                      Adigrat
                    </option>

                    <option value="Humera">
                      Humera
                    </option>

                    <option value="Dilla">
                      Dilla
                    </option>

                    <option value="Wolkite">
                      Wolkite
                    </option>

                    <option value="Hosaena">
                      Hosaena
                    </option>

                    <option value="Assosa">
                      Assosa
                    </option>

                    <option value="Gambela">
                      Gambela
                    </option>

                    <option value="Bonga">
                      Bonga
                    </option>

                    <option value="Asella">
                      Asella
                    </option>
                  </select>
                </div>

                {/* Address */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Delivery Address
                  </label>

                  <input
                    type="text"
                    value={address}
                    onChange={(e) =>
                      setAddress(e.target.value)
                    }
                    placeholder="Enter your delivery address"
                    className="w-full rounded border border-gray-300 p-3 outline-none focus:border-blue-500"
                  />
                </div>

              </div>
            </div>

            {/* PAYMENT */}
            <div className="rounded-sm bg-white p-6 shadow-sm">

              <h2 className="mb-4 text-xl font-medium">
                2. Payment Method
              </h2>

              <div className="space-y-3">

                {/* Cash */}
                <label className="flex cursor-pointer items-center gap-3 rounded border border-gray-300 p-4 hover:bg-gray-50">

                  <input
                    type="radio"
                    name="payment"
                    value="Cash on Delivery"
                    checked={
                      paymentMethod ===
                      "Cash on Delivery"
                    }
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                  />

                  <span>
                    Cash on Delivery
                  </span>

                </label>

                {/* Bank */}
                <label className="flex cursor-pointer items-center gap-3 rounded border border-gray-300 p-4 hover:bg-gray-50">

                  <input
                    type="radio"
                    name="payment"
                    value="Bank Transfer"
                    checked={
                      paymentMethod ===
                      "Bank Transfer"
                    }
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                  />

                  <span>
                    Bank Transfer
                  </span>

                </label>

                {/* Chapa */}
                <label className="flex cursor-pointer items-center gap-3 rounded border border-gray-300 p-4 hover:bg-gray-50">

                  <input
                    type="radio"
                    name="payment"
                    value="Chapa"
                    checked={
                      paymentMethod === "Chapa"
                    }
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                  />

                  <span>
                    Chapa
                  </span>

                </label>

              </div>
            </div>

            {/* REVIEW ITEMS */}
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
                        $
                        {(
                          Number(item.price) *
                          item.quantity
                        ).toFixed(2)}
                      </p>

                    </div>

                  </div>
                ))}

              </div>
            </div>

          </div>

          {/* ORDER SUMMARY */}
          <div className="h-fit rounded-sm bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-xl font-medium">
              Order Summary
            </h2>

            <div className="space-y-4 text-sm">

              <div className="flex justify-between">
                <span>Subtotal</span>

                <span>
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>

                <span>
                  ${shipping.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-green-700">
                <span>Savings</span>

                <span>
                  -${savings.toFixed(2)}
                </span>
              </div>

              <div className="border-t pt-4">

                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>

                  <span>
                    ${total.toFixed(2)}
                  </span>
                </div>

              </div>

            </div>

            {/* PLACE ORDER */}
            <button
              onClick={handlePlaceOrder}
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