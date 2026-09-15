import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import products from "./data/products";
import ProductListing from "./components/ProductListing/ProductListing";
import Filters from "./components/Filters/Filters";
import Sorting from "./components/Sorting/Sorting";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Confirmation from "./pages/OrderConfirmation/Confirmation";
import OrdersPage from "./pages/Orders/OrdersPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Account from "./pages/Account/Account";
import Profile from "./pages/Profile/Profile";
import Security from "./pages/Security/Security";
import Addresses from "./pages/Addresses/Addresses";
import PaymentMethods from "./pages/PaymentMethods/PaymentMethods";
import Lists from "./pages/Lists/Lists";
import GiftCards from "./pages/GiftCards/GiftCards";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import GiftCardBuy from "./pages/GiftCardBuy/GiftCardBuy";
import GiftCardReload from "./pages/GiftCardReload/GiftCardReload";
import GiftCardActivity from "./pages/GiftCardActivity/GiftCardActivity";
import ArchivedOrders from "./pages/ArchivedOrders/ArchivedOrders";
import Messages from "./pages/Messages/Messages";
import Prime from "./pages/Prime/Prime";
import SubscribeSave from "./pages/SubscribeSave/SubscribeSave";
import ManageContent from "./pages/ManageContent/ManageContent";
import DigitalDownloads from "./pages/DigitalDownloads/DigitalDownloads";
import AccountPreferences from "./pages/AccountPreferences/AccountPreferences";

function ProductRoutes() {
  const [filters, setFilters] = useState({ category: "All", minPrice: "", maxPrice: "", rating: "0", availability: "All", brand: "All" });
  const [sortBy, setSortBy] = useState("default");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) => {
    const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = filters.category === "All" || product.category === filters.category;
    const minPriceMatch = filters.minPrice === "" || product.price >= Number(filters.minPrice);
    const maxPriceMatch = filters.maxPrice === "" || product.price <= Number(filters.maxPrice);
    const ratingMatch = filters.rating === "0" || product.rating >= Number(filters.rating);
    const availabilityMatch = filters.availability === "All" || product.availability === filters.availability;
    const brandMatch = filters.brand === "All" || product.brand === filters.brand;

    return searchMatch && categoryMatch && minPriceMatch && maxPriceMatch && ratingMatch && availabilityMatch && brandMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "newest") return new Date(b.dateAdded) - new Date(a.dateAdded);
    return 0;
  });

  const categories = ["All", "Electronics", "Fashion", "Beauty", "Watches", "Luxury", "Accessories"];

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px", alignItems: "flex-start" }}>
      <Filters filters={filters} setFilters={setFilters} />
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
          {categories.map((category) => (
            <button key={category} onClick={() => setFilters({ ...filters, category })} style={{ padding: "10px 16px", border: "1px solid #ccc", borderRadius: "5px", background: filters.category === category ? "#111" : "#fff", color: filters.category === category ? "#fff" : "#111", cursor: "pointer" }}>
              {category}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <input type="text" placeholder="Search products..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} style={{ flex: 1, padding: "12px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px" }} />
        </div>
        <Sorting sortBy={sortBy} setSortBy={setSortBy} />
        {sortedProducts.length > 0 ? <ProductListing products={sortedProducts} /> : <p style={{ padding: "40px", textAlign: "center", color: "#666" }}>No products found.</p>}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/products" element={<ProductRoutes />} />
        <Route path="/product/:id" element={<h1>Product Details</h1>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/security" element={<ProtectedRoute><Security /></ProtectedRoute>} />
        <Route path="/addresses" element={<ProtectedRoute><Addresses /></ProtectedRoute>} />
        <Route path="/payment-methods" element={<ProtectedRoute><PaymentMethods /></ProtectedRoute>} />
        <Route path="/lists" element={<ProtectedRoute><Lists /></ProtectedRoute>} />
        <Route path="/gift-cards" element={<ProtectedRoute><GiftCards /></ProtectedRoute>} />
        <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
        <Route path="/archived-orders" element={<ProtectedRoute><ArchivedOrders /></ProtectedRoute>} />
        <Route path="/gift-cards/buy" element={<ProtectedRoute><GiftCardBuy /></ProtectedRoute>} />
        <Route path="/gift-cards/reload" element={<ProtectedRoute><GiftCardReload /></ProtectedRoute>} />
        <Route path="/gift-cards/activity" element={<ProtectedRoute><GiftCardActivity /></ProtectedRoute>} />
        <Route path="/prime" element={<ProtectedRoute><Prime /></ProtectedRoute>} />
        <Route path="/subscribe-save" element={<ProtectedRoute><SubscribeSave /></ProtectedRoute>} />
        <Route path="/manage-content" element={<ProtectedRoute><ManageContent /></ProtectedRoute>} />
        <Route path="/digital-downloads" element={<ProtectedRoute><DigitalDownloads /></ProtectedRoute>} />
        <Route path="/account-preferences" element={<ProtectedRoute><AccountPreferences /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/account" replace />} />
        <Route path="*" element={<Navigate to="/account" replace />} />
      </Routes>
    </Router>
  );
}
