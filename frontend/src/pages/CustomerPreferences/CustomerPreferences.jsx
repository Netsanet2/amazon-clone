import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerPreferences.css";

export default function CustomerPreferences() {
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState("EN");
  const [currency, setCurrency] = useState("USD");

  const handleSave = () => {
    navigate("/");
  };

  return (
    <div className="preferences-container">
      <h2>Language Settings</h2>
      <p className="sub-text">
        Select the language you want to use for browsing, shopping, and communications.
      </p>

      <div className="radio-group">
        {/* English */}
        <label className="radio-option-item">
          <input
            type="radio"
            name="lang"
            value="EN"
            checked={selectedLang === "EN"}
            onChange={(e) => setSelectedLang(e.target.value)}
          />
          <img 
            src="https://flagcdn.com/w20/us.png" 
            alt="US Flag" 
            className="flag-img" 
          />
          <span className="radio-text">English - EN - Translation</span>
        </label>

        {/* Spanish */}
        <label className="radio-option-item">
          <input
            type="radio"
            name="lang"
            value="ES"
            checked={selectedLang === "ES"}
            onChange={(e) => setSelectedLang(e.target.value)}
          />
          <span className="radio-text">español - ES - Traducción</span>
        </label>

        {/* Arabic */}
        <label className="radio-option-item">
          <input
            type="radio"
            name="lang"
            value="AR"
            checked={selectedLang === "AR"}
            onChange={(e) => setSelectedLang(e.target.value)}
          />
          <span className="radio-text">العربية - AR - الترجمة</span>
        </label>

        {/* German */}
        <label className="radio-option-item">
          <input
            type="radio"
            name="lang"
            value="DE"
            checked={selectedLang === "DE"}
            onChange={(e) => setSelectedLang(e.target.value)}
          />
          <span className="radio-text">Deutsch - DE - Übersetzung</span>
        </label>
      </div>

      <hr className="divider" />

      <h2>Currency Settings</h2>
      <p className="sub-text">Select the currency you want to shop with.</p>

      <select
        className="currency-select"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
      >
        <option value="USD">$ - USD - US Dollar (Default)</option>
        <option value="EUR">€ - EUR - Euro</option>
        <option value="GBP">£ - GBP - British Pound</option>
        <option value="ETB">Br - ETB - Ethiopian Birr</option>
      </select>

      <div className="action-buttons">
        <button type="button" className="cancel-btn" onClick={() => navigate("/")}>
          Cancel
        </button>
        <button type="button" className="save-btn" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
}