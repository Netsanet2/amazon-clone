import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Cart from "./pages/Cart/Cart";
import Orders from "./pages/Orders/Orders";
import Navbar from "./components/Navbar/Navbar";
import Checkout from "./pages/Checkout/Checkout";
import Products from "./pages/Products/Products";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={<h1>Home Page</h1>}
        />

        {/* Products */}
        <Route
          path="/products"
          element={<Products />}
        />

        {/* Product Details */}
        <Route
          path="/product/:id"
          element={<h1>Product Details</h1>}
        />

        {/* Cart */}
        <Route
          path="/cart"
          element={<Cart />}
        />

        {/* Checkout */}
        <Route
          path="/checkout"
          element={<Checkout />}
        />

        {/* Orders */}
        <Route
          path="/orders"
          element={<Orders />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={<h1>Login Page</h1>}
        />

        {/* Register */}
        <Route
          path="/register"
          element={<h1>Register Page</h1>}
        />

        {/* Account */}
        <Route
          path="/account"
          element={<h1>Account Page</h1>}
        />

        {/* 404 */}
        <Route
          path="*"
          element={<h1>404 - Page Not Found</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;