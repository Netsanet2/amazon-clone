import { useState } from "react";
import { Link } from "react-router-dom";
import "./AccountPreferences.css";

function AccountPreferences() {
  const [language, setLanguage] = useState("English - EN");
  const [country, setCountry] = useState("United States");
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [recommendations, setRecommendations] = useState(true);
  const [personalizedAds, setPersonalizedAds] = useState(true);

  const handleSave = () => {
    alert("Your preferences have been saved.");
  };

  const handleCancel = () => {
    setLanguage("English - EN");
    setCountry("United States");
    setEmailUpdates(true);
    setOrderUpdates(true);
    setRecommendations(true);
    setPersonalizedAds(true);

    alert("Your changes have been canceled.");
  };

  return (
    <div className="preferences-page">
      <div className="preferences-container">

        {/* Breadcrumb */}
        <div className="preferences-breadcrumb">
          <Link to="/account">Your Account</Link>
          <span>›</span>
          <span>Account Preferences</span>
        </div>

        {/* Page title */}
        <h1>Account Preferences</h1>

        <p className="preferences-intro">
          Manage your language, communication, shopping, and personalization
          preferences.
        </p>

        {/* Language & Region */}
        <section className="preference-section">
          <div className="section-heading">
            <h2>Language &amp; Region</h2>
            <p>
              Choose your preferred language and country or region for your
              Amazon shopping experience.
            </p>
          </div>

          <div className="preference-row">
            <div className="preference-info">
              <h3>Language</h3>
              <p>
                Your selected language is used for browsing, shopping, and
                communications.
              </p>
            </div>

            <div className="preference-control">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option>English - EN</option>
                <option>Español - ES</option>
                <option>Français - FR</option>
                <option>Deutsch - DE</option>
              </select>
            </div>
          </div>

          <div className="preference-row">
            <div className="preference-info">
              <h3>Country/Region</h3>
              <p>
                Your country or region can affect available products,
                services, and shopping options.
              </p>
            </div>

            <div className="preference-control">
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option>United States</option>
                <option>Ethiopia</option>
                <option>United Kingdom</option>
                <option>Canada</option>
                <option>Germany</option>
              </select>
            </div>
          </div>
        </section>

        {/* Communication Preferences */}
        <section className="preference-section">
          <div className="section-heading">
            <h2>Communication Preferences</h2>
            <p>
              Choose what types of messages and updates you want to receive.
            </p>
          </div>

          <div className="preference-row">
            <div className="preference-info">
              <h3>Email updates</h3>
              <p>
                Receive emails about promotions, recommendations, and other
                Amazon updates.
              </p>
            </div>

            <label className="toggle">
              <input
                type="checkbox"
                checked={emailUpdates}
                onChange={() => setEmailUpdates(!emailUpdates)}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="preference-row">
            <div className="preference-info">
              <h3>Order and delivery updates</h3>
              <p>
                Receive important updates about your orders and deliveries.
              </p>
            </div>

            <label className="toggle">
              <input
                type="checkbox"
                checked={orderUpdates}
                onChange={() => setOrderUpdates(!orderUpdates)}
              />
              <span className="slider"></span>
            </label>
          </div>
        </section>

        {/* Shopping Preferences */}
        <section className="preference-section">
          <div className="section-heading">
            <h2>Shopping Preferences</h2>
            <p>
              Manage how Amazon personalizes your shopping experience.
            </p>
          </div>

          <div className="preference-row">
            <div className="preference-info">
              <h3>Personalized recommendations</h3>
              <p>
                Allow recommendations to be based on your shopping activity,
                searches, and interests.
              </p>
            </div>

            <label className="toggle">
              <input
                type="checkbox"
                checked={recommendations}
                onChange={() => setRecommendations(!recommendations)}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="preference-row">
            <div className="preference-info">
              <h3>Personalized advertising</h3>
              <p>
                Manage whether advertisements are personalized based on your
                activity.
              </p>
            </div>

            <label className="toggle">
              <input
                type="checkbox"
                checked={personalizedAds}
                onChange={() => setPersonalizedAds(!personalizedAds)}
              />
              <span className="slider"></span>
            </label>
          </div>
        </section>

        {/* Save / Cancel */}
        <div className="preferences-actions">
          <button
            className="save-button"
            onClick={handleSave}
          >
            Save Changes
          </button>

          <button
            className="cancel-button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>

        {/* Help */}
        <div className="preferences-help">
          <h2>Need more help?</h2>

          <p>
            You can manage other account information from your account
            settings.
          </p>

          <div className="help-links">
            <Link to="/security">Login &amp; Security</Link>
            <Link to="/profile">Personal Information</Link>
            <Link to="/account">Your Account</Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AccountPreferences;