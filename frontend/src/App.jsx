import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Cart from "./pages/cart/Cart";
import Navbar from "./components/Navbar/Navbar";

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

        {/* Cart - Person 3 */}
        <Route
          path="/cart"
          element={<Cart />}
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