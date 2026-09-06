import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Checkout from './pages/Checkout/Checkout';
import Confirmation from './pages/OrderConfirmation/Confirmation';
import OrdersPage from './pages/Orders/OrdersPage';

// Auth Pages
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';

// Account Pages
import Account from './pages/Account/Account';
import Profile from './pages/Profile/Profile';
import Security from './pages/Security/Security';
import Addresses from './pages/Addresses/Addresses';
import PaymentMethods from './pages/PaymentMethods/PaymentMethods';
import Lists from './pages/Lists/Lists';
import GiftCards from './pages/GiftCards/GiftCards';

// Protected Route
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import GiftCardBuy from './pages/GiftCardBuy/GiftCardBuy';
import GiftCardReload from './pages/GiftCardReload/GiftCardReload';
import GiftCardActivity from "./pages/GiftCardActivity/GiftCardActivity";
import ArchivedOrders from "./pages/ArchivedOrders/ArchivedOrders";
import Messages from "./pages/Messages/Messages";
import Prime from "./pages/Prime/Prime";
import SubscribeSave from "./pages/SubscribeSave/SubscribeSave";
import ManageContent from "./pages/ManageContent/ManageContent";
import DigitalDownloads from "./pages/DigitalDownloads/DigitalDownloads";
import AccountPreferences from "./pages/AccountPreferences/AccountPreferences";
import Cart from "./pages/cart/Cart";

// Placeholder for pages not created yet
const PlaceholderPage = ({ title }) => (
  <div
    style={{
      padding: '40px',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif'
    }}
  >
    <h2>{title} Page</h2>
    <p>This feature is coming soon.</p>

    <a
      href="/account"
      style={{
        color: '#0066c0',
        textDecoration: 'none'
      }}
    >
      Back to Account
    </a>
  </div>
);

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/products" element={<h1>Products Page</h1>} />
        <Route path="/product/:id" element={<h1>Product Details</h1>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/orders" element={<OrdersPage />} />

        {/* Default Route */}
        <Route
          path="/"
          element={<Navigate to="/account" replace />}
        />

        {/* =========================
            PUBLIC AUTHENTICATION
        ========================== */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />


        {/* =========================
            PROTECTED ACCOUNT ROUTES
        ========================== */}

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


        {/* =========================
            UPCOMING PAGES
        ========================== */}

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


        {/* =========================
          404 FALLBACK
        ========================== */}

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
          element={<Navigate to="/account" replace />}
        />
      </Routes>
    </Router>
  );
}