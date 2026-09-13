import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useLanguage } from "../../pages/LanguageContext/LanguageContext";

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
  const tNav = navTranslations[language] || navTranslations.EN;

  const handleLanguageChange = (e) => {
    if (setLanguage) {
      setLanguage(e.target.value);
    }
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
        <div className="nav-item nav-deliver">
          <span className="nav-line1">{tNav.deliverTo}</span>
          <span className="nav-line2">Ethiopia</span>
        </div>

        {/* Search Bar */}
        <div className="nav-search">
          <select className="search-select">
            <option>{tNav.all}</option>
          </select>
          <input
            type="text"
            className="search-input"
            placeholder={tNav.searchPlaceholder}
          />
          <button className="search-btn">🔍</button>
        </div>

        {/* Controls */}
        <div className="nav-right">
          {/* Language Selector */}
          <div className="nav-item nav-dropdown-trigger">
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
                <Link to="/login" className="nav-signin-btn">
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
            <span className="cart-count">0</span>
            <span className="cart-text">{tNav.cart}</span>
          </Link>
        </div>
      </nav>

      {/* SECONDARY NAVBAR */}
      <div className="nav-secondary">
        <div className="all-menu">
          <span>☰</span>
          <span>{tNav.all}</span>
        </div>
        <Link to="/todays-deals" className="nav-link">
          {tNav.deals}
        </Link>
        <Link to="/customer-service" className="nav-link">
          {tNav.service}
        </Link>
        <Link to="/registry" className="nav-link">
          {tNav.registry}
        </Link>
        <Link to="/gift-cards" className="nav-link">
          {tNav.giftCards}
        </Link>
        <Link to="/sell" className="nav-link">
          {tNav.sell}
        </Link>
      </div>
    </>
  );
}