import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import Navbar from "./components/Navbar/Navbar";
import Checkout from "./pages/Checkout/Checkout";
import Products from "./pages/Products/Products";
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<h1>Product Details</h1>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
  path="/orders"
  element={
    <div className="min-h-screen bg-[#eaeded] p-8">
      <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-sm">
        <div className="text-center">
          <div className="text-5xl">✅</div>

          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Order Placed Successfully!
          </h1>

          <p className="mt-2 text-gray-600">
            Thank you for your order. Your items are being prepared for delivery.
          </p>
        </div>

        <div className="mt-8 border-t pt-6">
          <h2 className="text-xl font-semibold">
            Order Details
          </h2>

          <p className="mt-3 text-gray-600">
            Order status:{" "}
            <span className="font-semibold text-green-700">
              Confirmed
            </span>
          </p>

          <p className="mt-2 text-gray-600">
            Payment: Cash on Delivery
          </p>

          <p className="mt-2 text-gray-600">
            Delivery: Addis Ababa, Ethiopia
          </p>
        </div>
      </div>
    </div>
  }
/>
        <Route path="/login" element={<h1>Login Page</h1>} />
        <Route path="/register" element={<h1>Register Page</h1>} />
        <Route path="/account" element={<h1>Account Page</h1>} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;