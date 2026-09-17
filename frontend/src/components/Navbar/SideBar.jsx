import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { productCategories } from "../../data/products";
import "./SideBar.css";

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSignOut = () => {
    logout();
    onClose();
  };

  const closeAfterNavigation = () => onClose();

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? "active" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      ></div>
      <aside
        className={`sidebar-panel ${isOpen ? "open" : ""}`}
        aria-label="Main navigation"
        aria-hidden={!isOpen}
      >
        <div className="sidebar-header">
          <Link to={user ? "/account" : "/login"} onClick={closeAfterNavigation} className="sidebar-greeting">
            <svg className="sidebar-avatar" viewBox="0 0 32 32" aria-hidden="true">
              <circle cx="16" cy="16" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="16" cy="11" r="4" fill="currentColor" />
              <path d="M8 26c1.5-4.5 4.3-6.8 8-6.8s6.5 2.3 8 6.8" fill="currentColor" />
            </svg>
            <span>Hello, {user?.name || "sign in"}</span>
          </Link>
          <button type="button" className="sidebar-close" onClick={onClose} aria-label="Close navigation menu">
            ×
          </button>
        </div>

        <div className="sidebar-section">
          <h3>Digital Content &amp; Devices</h3>
          <nav aria-label="Digital content and devices">
            <Link to="/prime" onClick={closeAfterNavigation}>Prime Video <span aria-hidden="true">›</span></Link>
            <Link to="/manage-content" onClick={closeAfterNavigation}>Manage Your Content and Devices <span aria-hidden="true">›</span></Link>
            <Link to="/digital-downloads" onClick={closeAfterNavigation}>Digital Downloads <span aria-hidden="true">›</span></Link>
          </nav>
        </div>

        <div className="sidebar-section">
          <button
            type="button"
            className="sidebar-section-toggle"
            onClick={() => setIsDepartmentsOpen((isOpen) => !isOpen)}
            aria-expanded={isDepartmentsOpen}
          >
            <span>Shop by Department</span>
            <span className={`sidebar-chevron ${isDepartmentsOpen ? "expanded" : ""}`} aria-hidden="true">›</span>
          </button>
          {isDepartmentsOpen && (
            <nav aria-label="Shop by department">
              {productCategories.map((category) => (
                <Link key={category} to={category === "All" ? "/products" : `/products?category=${encodeURIComponent(category)}`} onClick={closeAfterNavigation}>
                  <span className="sidebar-link-label">{category}</span><span aria-hidden="true">›</span>
                </Link>
              ))}
            </nav>
          )}
        </div>

        <div className="sidebar-section">
          <h3>Programs &amp; Features</h3>
          <nav aria-label="Programs and features">
            <Link to="/gift-cards" onClick={closeAfterNavigation}>Gift Cards <span aria-hidden="true">›</span></Link>
            <Link to="/prime" onClick={closeAfterNavigation}>Prime membership <span aria-hidden="true">›</span></Link>
            <Link to="/subscribe-save" onClick={closeAfterNavigation}>Subscribe &amp; Save <span aria-hidden="true">›</span></Link>
          </nav>
        </div>

        <div className="sidebar-section">
          <h3>Help &amp; Settings</h3>
          <nav aria-label="Help and settings">
            <Link to="/account" onClick={closeAfterNavigation}>Your Account <span aria-hidden="true">›</span></Link>
            <Link to="/customer-preferences" onClick={closeAfterNavigation}>Language / Country &amp; Region <span aria-hidden="true">›</span></Link>
            <Link to="/customer-service" onClick={closeAfterNavigation}>Customer Service <span aria-hidden="true">›</span></Link>
            {user ? (
              <button type="button" className="sidebar-action" onClick={handleSignOut}>Sign out <span aria-hidden="true">›</span></button>
            ) : (
              <Link to="/login" onClick={closeAfterNavigation}>Sign in <span aria-hidden="true">›</span></Link>
            )}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
