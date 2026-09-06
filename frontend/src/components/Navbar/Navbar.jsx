import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    if (searchTerm.trim() === "") return;
    navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            MyStore
          </Link>
        </div>

        <form className="navbar-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            className="navbar-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="navbar-search-button">🔍</button>
        </form>

        <div className="navbar-right">
          <Link to="/login" className="navbar-link">Sign In</Link>
          <Link to="/orders" className="navbar-link">Orders</Link>
          <Link to="/cart" className="navbar-link navbar-cart">🛒 Cart</Link>
        </div>
      </nav>

      <div className="category-bar">
        <Link to="/products?category=electronics" className="category-link">Electronics</Link>
        <Link to="/products?category=fashion" className="category-link">Fashion</Link>
        <Link to="/products?category=home" className="category-link">Home & Kitchen</Link>
        <Link to="/products?category=beauty" className="category-link">Beauty</Link>
        <Link to="/products?category=toys" className="category-link">Toys</Link>
        <Link to="/products" className="category-link">All Products</Link>
      </div>
    </>
  );
}

export default Navbar;