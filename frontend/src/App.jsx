import "./App.css";
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useSearchParams,
} from "react-router-dom";

import { getProducts } from "./services/productService";
import ProductListing from "./components/ProductListing/ProductListing";
import Filters from "./components/Filters/Filters";
import Sorting from "./components/Sorting/Sorting";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Confirmation from "./pages/OrderConfirmation/Confirmation";
import OrdersPage from "./pages/Orders/OrdersPage";
import OrderDetails from "./pages/Orders/OrdersDetails";
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
import CustomerPreferences from "./pages/CustomerPreferences/CustomerPreferences";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import CustomerServicePage from "./pages/CustomerServicePage/CustomerServicePage";
import RegistryPage from "./pages/RegistryPage/RegistryPage";
import TodaysDealsPage from "./pages/TodaysDealsPage/TodaysDealsPage";
import SellPage from "./pages/SellPage/SellPage";
import SellerIncentives from "./pages/SellerIncentives/SellerIncentives";
import { LanguageProvider } from "./pages/LanguageContext/LanguageContext";
import ProductDetails from "./pages/ProductDetails";
import AboutAmazon from "./pages/AboutAmazon/AboutAmazon";

function ProductRoutes() {
  const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const productCategories = [
  "All",
  ...new Set(products.map((product) => product.category)),
];
  const requestedCategory = searchParams.get("category");
  useEffect(() => {
  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProducts();

      setProducts(data);
    } catch (error) {
      console.error("Failed to load products:", error);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  loadProducts();
}, []);
  const requestedSearch = searchParams.get("search") || "";

  const initialCategory = productCategories.includes(requestedCategory)
    ? requestedCategory
    : "All";

  const [filters, setFilters] = useState({
    category: initialCategory,
    minPrice: "",
    maxPrice: "",
    rating: "0",
    availability: "All",
    brand: "All",
  });

  const [sortBy, setSortBy] = useState("default");
  const [searchTerm, setSearchTerm] = useState(requestedSearch);

  useEffect(() => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      category: productCategories.includes(requestedCategory)
        ? requestedCategory
        : "All",
    }));

    setSearchTerm(requestedSearch);
  }, [requestedCategory, requestedSearch]);

  const filteredProducts = products.filter((product) => {
    const searchMatch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return (
      searchMatch &&
      (filters.category === "All" ||
        product.category === filters.category) &&
      (filters.minPrice === "" ||
        product.price >= Number(filters.minPrice)) &&
      (filters.maxPrice === "" ||
        product.price <= Number(filters.maxPrice)) &&
      (filters.rating === "0" ||
        product.rating >= Number(filters.rating)) &&
      (filters.availability === "All" ||
        product.availability === filters.availability) &&
      (filters.brand === "All" ||
        product.brand === filters.brand)
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "newest") {
      return new Date(b.dateAdded) - new Date(a.dateAdded);
    }

    return 0;
  });
if (loading) {
  return <p>Loading products...</p>;
}

if (error) {
  return <p>{error}</p>;
}
  return (
    <div className="products-page-layout">
      <Filters filters={filters} setFilters={setFilters} />

      <div className="products-page-content">
        <div className="products-category-buttons">
          {productCategories.map((category) => (
            <button
              key={category}
              onClick={() =>
                setFilters({ ...filters, category })
              }
            >
              {category}
            </button>
          ))}
        </div>

        <input
          className="products-search-input"
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(event.target.value)
          }
        />

        <Sorting
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {sortedProducts.length > 0 ? (
          <ProductListing products={sortedProducts} />
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductRoutes />} />
          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />
          <Route
            path="/products/:id"
            element={<ProductDetails />}
          />

          <Route
            path="/customer-service"
            element={<CustomerServicePage />}
          />
          <Route
            path="/customer-service/:topic"
            element={<h1>Customer Service Topic Page</h1>}
          />
          <Route
            path="/todays-deals"
            element={<TodaysDealsPage />}
          />
          <Route
            path="/registry"
            element={<RegistryPage />}
          />
          <Route path="/sell" element={<SellPage />} />
          <Route
            path="/sell/incentives"
            element={<SellerIncentives />}
          />
          <Route
            path="/customer-preferences"
            element={<CustomerPreferences />}
          />
          <Route
            path="/labor-day"
            element={<h1>Labor Day Sale Page</h1>}
          />

          <Route path="/cart" element={<Cart />} />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/confirmation"
            element={<Confirmation />}
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders/:orderId"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/security"
            element={
              <ProtectedRoute>
                <Security />
              </ProtectedRoute>
            }
          />

          <Route
            path="/addresses"
            element={
              <ProtectedRoute>
                <Addresses />
              </ProtectedRoute>
            }
          />

          <Route
            path="/payment-methods"
            element={
              <ProtectedRoute>
                <PaymentMethods />
              </ProtectedRoute>
            }
          />

          <Route
            path="/lists"
            element={
              <ProtectedRoute>
                <Lists />
              </ProtectedRoute>
            }
          />

          <Route
            path="/gift-cards"
            element={
              <ProtectedRoute>
                <GiftCards />
              </ProtectedRoute>
            }
          />

          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            }
          />

          <Route
            path="/archived-orders"
            element={
              <ProtectedRoute>
                <ArchivedOrders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/gift-cards/buy"
            element={
              <ProtectedRoute>
                <GiftCardBuy />
              </ProtectedRoute>
            }
          />

          <Route
            path="/gift-cards/reload"
            element={
              <ProtectedRoute>
                <GiftCardReload />
              </ProtectedRoute>
            }
          />

          <Route
            path="/gift-cards/activity"
            element={
              <ProtectedRoute>
                <GiftCardActivity />
              </ProtectedRoute>
            }
          />

          <Route
            path="/prime"
            element={
              <ProtectedRoute>
                <Prime />
              </ProtectedRoute>
            }
          />

          <Route
            path="/subscribe-save"
            element={
              <ProtectedRoute>
                <SubscribeSave />
              </ProtectedRoute>
            }
          />

          <Route
            path="/manage-content"
            element={
              <ProtectedRoute>
                <ManageContent />
              </ProtectedRoute>
            }
          />

          <Route
            path="/digital-downloads"
            element={
              <ProtectedRoute>
                <DigitalDownloads />
              </ProtectedRoute>
            }
          />

          <Route
            path="/account-preferences"
            element={
              <ProtectedRoute>
                <AccountPreferences />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />

          <Route
            path="/about-amazon"
            element={<AboutAmazon />}
          />
        </Routes>

        <Footer />
      </BrowserRouter>
    </LanguageProvider>
  );
}