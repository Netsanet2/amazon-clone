import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useLanguage } from "../../pages/LanguageContext/LanguageContext";
import { useCart } from "../../context/CartContext";
import { productCategories } from "../../data/products";
import SideBar from "./SideBar";

const navTranslations = {
  EN: {
    all: "All",
    deals: "Today's Deals",
    service: "Customer Service",
    registry: "Registry",
    giftCards: "Gift Cards",
    sell: "Sell",
    deliverTo: "Deliver to",
    searchPlaceholder: "Search Amazon",
    helloSignIn: "Hello, sign in",
    accountLists: "Account & Lists",
    returns: "Returns",
    orders: "& Orders",
    cart: "Cart",
    changeLang: "Change language",
    changeCurr: "Change currency",
    change: "Change",
    startHere: "Start here.",
    newCustomer: "New customer?",
    signIn: "Sign in",
    yourLists: "Your Lists",
    createList: "Create a List",
    findList: "Find a List or Registry",
    yourAccount: "Your Account",
    account: "Account",
    recommendations: "Recommendations",
    history: "Browsing History",
  },
  ES: {
    all: "Todo",
    deals: "Ofertas de hoy",
    service: "Servicio al Cliente",
    registry: "Registros",
    giftCards: "Tarjetas de regalo",
    sell: "Vender",
    deliverTo: "Enviar a",
    searchPlaceholder: "Buscar Amazon",
    helloSignIn: "Hola, identifícate",
    accountLists: "Cuentas y Listas",
    returns: "Devoluciones",
    orders: "y Pedidos",
    cart: "Carrito",
    changeLang: "Cambiar idioma",
    changeCurr: "Cambiar moneda",
    change: "Cambiar",
    startHere: "Empieza aquí.",
    newCustomer: "¿Cliente nuevo?",
    signIn: "Identificarse",
    yourLists: "Tus listas",
    createList: "Crear una lista",
    findList: "Buscar una lista",
    yourAccount: "Tu cuenta",
    account: "Cuenta",
    recommendations: "Recomendaciones",
    history: "Historial de exploración",
  },
  AR: {
    all: "الكل",
    deals: "صفقات اليوم",
    service: "خدمة العملاء",
    registry: "القائمة",
    giftCards: "بطاقات الهدايا",
    sell: "بيع",
    deliverTo: "التوصيل إلى",
    searchPlaceholder: "البحث في Amazon",
    helloSignIn: "مرحباً، تسجيل الدخول",
    accountLists: "الحساب والقوائم",
    returns: "المشتريات",
    orders: "والطلبات",
    cart: "السلة",
    changeLang: "تغيير اللغة",
    changeCurr: "تغيير العملة",
    change: "تغيير",
    startHere: "ابدأ من هنا.",
    newCustomer: "عميل جديد؟",
    signIn: "تسجيل الدخول",
    yourLists: "قوائمك",
    createList: "إنشاء قائمة",
    findList: "البحث عن قائمة",
    yourAccount: "حسابك",
    account: "الحساب",
    recommendations: "التوصيات",
    history: "سجل التصفح",
  },
  DE: {
    all: "Alle",
    deals: "Heutige Angebote",
    service: "Kundenservice",
    registry: "Wunschliste",
    giftCards: "Geschenkkarten",
    sell: "Verkaufen",
    deliverTo: "Liefern an",
    searchPlaceholder: "Amazon durchsuchen",
    helloSignIn: "Hallo, Anmelden",
    accountLists: "Konto und Listen",
    returns: "Rücksendungen",
    orders: "& Bestellungen",
    cart: "Einkaufswagen",
    changeLang: "Sprache ändern",
    changeCurr: "Währung ändern",
    change: "Ändern",
    startHere: "Hier starten.",
    newCustomer: "Neukunde?",
    signIn: "Anmelden",
    yourLists: "Meine Listen",
    createList: "Liste erstellen",
    findList: "Liste finden",
    yourAccount: "Mein Konto",
    account: "Konto",
    recommendations: "Empfehlungen",
    history: "Verlauf",
  },
};

export default function Navbar() {
  const { language, setLanguage } = useLanguage();
  const { getCartCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const tNav = navTranslations[language] || navTranslations.EN;
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState(
    () => localStorage.getItem("amazon-clone-delivery-location") || "Ethiopia"
  );
  const [deliveryPostalCode, setDeliveryPostalCode] = useState(
    () => localStorage.getItem("amazon-clone-delivery-postal-code") || ""
  );
  const [deliveryDraft, setDeliveryDraft] = useState(deliveryLocation);
  const [postalDraft, setPostalDraft] = useState(deliveryPostalCode);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categoryMenuRef = useRef(null);
  const locationMenuRef = useRef(null);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (!categoryMenuRef.current?.contains(event.target)) {
        setIsCategoryMenuOpen(false);
      }
      if (!locationMenuRef.current?.contains(event.target)) {
        setIsLocationOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsCategoryMenuOpen(false);
        setIsLocationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    setSelectedCategory(productCategories.includes(category) ? category : "All");
    setSearchTerm(params.get("search") || "");
  }, [location.search]);

  const handleLanguageChange = (e) => {
    if (setLanguage) {
      setLanguage(e.target.value);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm.trim()) {
      params.set("search", searchTerm.trim());
    }
    if (selectedCategory !== "All") {
      params.set("category", selectedCategory);
    }
    navigate(`/products${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsCategoryMenuOpen(false);
    const params = new URLSearchParams();
    if (searchTerm.trim()) {
      params.set("search", searchTerm.trim());
    }
    if (category !== "All") {
      params.set("category", category);
    }
    navigate(`/products${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const openLocationMenu = () => {
    setDeliveryDraft(deliveryLocation);
    setPostalDraft(deliveryPostalCode);
    setIsLocationOpen(true);
  };

  const saveDeliveryLocation = () => {
    setDeliveryLocation(deliveryDraft);
    setDeliveryPostalCode(postalDraft);
    localStorage.setItem("amazon-clone-delivery-location", deliveryDraft);
    localStorage.setItem("amazon-clone-delivery-postal-code", postalDraft);
    setIsLocationOpen(false);
  };

  return (
    <>
      {/* PRIMARY NAVBAR */}
      <nav className="primary-navbar">
        <div className="nav-left">
          <Link to="/" className="nav-logo">
            <img 
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" 
              alt="Amazon" 
              className="amazon-logo-dark"
            />
          </Link>
        </div>

        {/* Deliver Location */}
        <div className="nav-location-wrapper" ref={locationMenuRef}>
            <button type="button" className="nav-item nav-deliver" onClick={openLocationMenu} aria-expanded={isLocationOpen} aria-haspopup="dialog" aria-controls="delivery-location-dialog">
              <span className="nav-line1">{tNav.deliverTo}</span>
              <span className="nav-line2">{deliveryLocation}</span>
          </button>
          {isLocationOpen && (
            <div id="delivery-location-dialog" className="location-popover" role="dialog" aria-modal="false" aria-label="Choose your delivery location">
              <div className="location-popover-header">
                <h2>Choose your delivery location</h2>
                <button type="button" className="location-close" onClick={() => setIsLocationOpen(false)} aria-label="Close delivery location dialog">×</button>
              </div>
              <label htmlFor="delivery-country">Country/Region</label>
              <select id="delivery-country" value={deliveryDraft} onChange={(event) => setDeliveryDraft(event.target.value)}>
                <option>Ethiopia</option>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Canada</option>
                <option>Germany</option>
              </select>
              <label htmlFor="delivery-postal">Postal/ZIP code</label>
              <input id="delivery-postal" value={postalDraft} onChange={(event) => setPostalDraft(event.target.value)} placeholder="Optional" />
              <div className="location-actions">
                <button type="button" onClick={() => setIsLocationOpen(false)}>Cancel</button>
                <button type="button" onClick={saveDeliveryLocation}>Apply</button>
              </div>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <form className="nav-search" onSubmit={handleSearch}>
          <div className="search-category-wrapper" ref={categoryMenuRef}>
            <button type="button" className="search-select" onClick={() => setIsCategoryMenuOpen((open) => !open)} aria-expanded={isCategoryMenuOpen} aria-haspopup="menu" aria-controls="search-category-menu">
              {selectedCategory === "All" ? tNav.all : selectedCategory}
              <span aria-hidden="true">▾</span>
            </button>
            {isCategoryMenuOpen && (
              <div id="search-category-menu" className="search-category-menu" role="menu">
                {productCategories.map((category) => (
                  <button type="button" role="menuitem" key={category} className={selectedCategory === category ? "selected" : ""} onClick={() => handleCategorySelect(category)}>
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
          <input
            type="text"
            className="search-input"
            placeholder={tNav.searchPlaceholder}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button type="submit" className="search-btn" aria-label="Search">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></svg>
          </button>
        </form>

        {/* Controls */}
        <div className="nav-right">
          {/* Language Selector */}
          <div className="nav-item nav-dropdown-trigger nav-account-trigger">
            <div className="nav-lang-box">
              <img 
                src="https://flagcdn.com/w20/us.png" 
                alt="US Flag" 
                className="nav-flag-img" 
              />
              <span className="nav-line2">{language}</span>
              <span className="nav-arrow">▼</span>
            </div>
            <div className="nav-dropdown language-dropdown">
              <div className="dropdown-arrow"></div>
              <div className="dropdown-section">
                <p className="dropdown-title">{tNav.changeLang}</p>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="lang"
                    value="EN"
                    checked={language === "EN"}
                    onChange={handleLanguageChange}
                  />
                  English - EN
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="lang"
                    value="ES"
                    checked={language === "ES"}
                    onChange={handleLanguageChange}
                  />
                  español - ES
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="lang"
                    value="AR"
                    checked={language === "AR"}
                    onChange={handleLanguageChange}
                  />
                  العربية - AR
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="lang"
                    value="DE"
                    checked={language === "DE"}
                    onChange={handleLanguageChange}
                  />
                  Deutsch - DE
                </label>
              </div>

              <div className="dropdown-divider"></div>

              <div className="dropdown-section">
                <p className="dropdown-title">{tNav.changeCurr}</p>
                <div className="currency-row">
                  <span>$ - USD - US Dollar</span>
                  <Link to="/customer-preferences" className="change-btn">
                    {tNav.change}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="nav-item nav-dropdown-trigger">
            <span className="nav-line1">{tNav.helloSignIn}</span>
            <div className="nav-line2-wrap">
              <span className="nav-line2">{tNav.accountLists}</span>
              <span className="nav-arrow">▼</span>
            </div>

            <div className="nav-dropdown account-dropdown">
              <div className="dropdown-arrow"></div>
              <div className="account-top">
                <Link to="/login" state={{ from: { pathname: "/account" } }} className="nav-signin-btn">
                  {tNav.signIn}
                </Link>
                <p className="new-customer-text">
                  {tNav.newCustomer} <Link to="/register">{tNav.startHere}</Link>
                </p>
              </div>
              <div className="account-grid">
                <div className="account-col">
                  <h4>{tNav.yourLists}</h4>
                  <ul>
                    <li><Link to="/lists">{tNav.createList}</Link></li>
                    <li><Link to="/registry">{tNav.findList}</Link></li>
                  </ul>
                </div>

                <div className="account-col border-left">
                  <h4>{tNav.yourAccount}</h4>
                  <ul>
                    <li><Link to="/account">{tNav.account}</Link></li>
                    <li><Link to="/orders">{tNav.orders}</Link></li>
                    <li><Link to="/recommendations">{tNav.recommendations}</Link></li>
                    <li><Link to="/history">{tNav.history}</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <Link to="/orders" className="nav-item">
            <span className="nav-line1">{tNav.returns}</span>
            <span className="nav-line2">{tNav.orders}</span>
          </Link>

          {/* Cart */}
          <Link to="/cart" className="nav-item nav-cart">
            <span className="cart-count">{getCartCount()}</span>
            <span className="cart-text">{tNav.cart}</span>
          </Link>
        </div>
      </nav>

      {/* SECONDARY NAVBAR */}
      <div className="nav-secondary">
        {/* FIXED: State variable matched correctly to setIsSideBarOpen */}
        <button
          type="button"
          className="all-menu"
          onClick={() => setIsSideBarOpen(true)}
          aria-label="Open navigation menu"
        >
          <span>☰</span>
          <span>{tNav.all}</span>
        </button>
        <NavLink to="/todays-deals" className="nav-link">
          {tNav.deals}
        </NavLink>
        <NavLink to="/customer-service" className="nav-link">
          {tNav.service}
        </NavLink>
        <NavLink to="/registry" className="nav-link">
          {tNav.registry}
        </NavLink>
        <NavLink to="/gift-cards" className="nav-link">
          {tNav.giftCards}
        </NavLink>
        <NavLink to="/sell" className="nav-link">
          {tNav.sell}
        </NavLink>
      </div>

      {/* RENDER SIDEBAR COMPONENT HERE */}
      <SideBar isOpen={isSideBarOpen} onClose={() => setIsSideBarOpen(false)} />
    </>
  );
}