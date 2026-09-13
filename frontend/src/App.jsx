import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./pages/cart/Cart";

import products from "./data/products";
import ProductListing from "./components/ProductListing/ProductListing";
import Filters from "./components/Filters/Filters";
import Sorting from "./components/Sorting/Sorting";

function App() {
  const [filters, setFilters] = useState({
    category: "All",
    minPrice: "",
    maxPrice: "",
    rating: "0",
    availability: "All",
    brand: "All",
  });

  const [sortBy, setSortBy] = useState("default");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) => {
    const searchMatch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const categoryMatch =
      filters.category === "All" ||
      product.category === filters.category;

    const minPriceMatch =
      filters.minPrice === "" ||
      product.price >= Number(filters.minPrice);

    const maxPriceMatch =
      filters.maxPrice === "" ||
      product.price <= Number(filters.maxPrice);

    const ratingMatch =
      filters.rating === "0" ||
      product.rating >= Number(filters.rating);

    const availabilityMatch =
      filters.availability === "All" ||
      product.availability === filters.availability;

    const brandMatch =
      filters.brand === "All" ||
      product.brand === filters.brand;

    return (
      searchMatch &&
      categoryMatch &&
      minPriceMatch &&
      maxPriceMatch &&
      ratingMatch &&
      availabilityMatch &&
      brandMatch
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") {
      return a.price - b.price;
    }

    if (sortBy === "price-high") {
      return b.price - a.price;
    }

    if (sortBy === "rating") {
      return b.rating - a.rating;
    }

    if (sortBy === "newest") {
      return new Date(b.dateAdded) - new Date(a.dateAdded);
    }

    return 0;
  });

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Beauty",
    "Watches",
    "Luxury",
    "Accessories",
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />

        <Route
          path="/products"
          element={
            <div
              style={{
                display: "flex",
                gap: "20px",
                padding: "20px",
                alignItems: "flex-start",
              }}
            >
              <Filters
                filters={filters}
                setFilters={setFilters}
              />

              <div style={{ flex: 1 }}>
                {/* Category Navigation */}
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    marginBottom: "20px",
                  }}
                >
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() =>
                        setFilters({
                          ...filters,
                          category: category,
                        })
                      }
                      style={{
                        padding: "10px 16px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        background:
                          filters.category === category
                            ? "#111"
                            : "#fff",
                        color:
                          filters.category === category
                            ? "#fff"
                            : "#111",
                        cursor: "pointer",
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Search */}
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "20px",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) =>
                      setSearchTerm(e.target.value)
                    }
                    style={{
                      flex: 1,
                      padding: "12px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      fontSize: "16px",
                    }}
                  />
                </div>

                {/* Sorting */}
                <Sorting
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                />

                {/* Products */}
                {sortedProducts.length > 0 ? (
                  <ProductListing
                    products={sortedProducts}
                  />
                ) : (
                  <p
                    style={{
                      padding: "40px",
                      textAlign: "center",
                      color: "#666",
                    }}
                  >
                    No products found.
                  </p>
                )}
              </div>
            </div>
          }
        />

        <Route
          path="/product/:id"
          element={<h1>Product Details</h1>}
        />

        {/* Cart remains separate */}
        <Route path="/cart" element={<Cart />} />

        <Route
          path="/checkout"
          element={<h1>Checkout Page</h1>}
        />

        <Route
          path="/orders"
          element={<h1>Orders Page</h1>}
        />

        <Route
          path="/login"
          element={<h1>Login Page</h1>}
        />

        <Route
          path="/register"
          element={<h1>Register Page</h1>}
        />

        <Route
          path="/account"
          element={<h1>Account Page</h1>}
        />

        <Route
          path="*"
          element={<h1>404 - Page Not Found</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;