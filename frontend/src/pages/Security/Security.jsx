import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import TwoStepVerification from "../../components/TwoStepVerification/TwoStepVerification";
import { isValidEmail, isValidPassword, isValidPhone, sanitizePhone, validationMessages } from "../../utils/validation";
import "./Security.css";
export default function Security() {
  const { user, logout } = useAuth();

  const [personalInfo, setPersonalInfo] = useState({
    name: user?.name || "Customer Name",
    email: user?.email || "customer@example.com",
    phone: user?.phone || "",
  });

  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState("");

  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showTwoStep, setShowTwoStep] = useState(false);

  // -----------------------------
  // EDIT NAME / EMAIL / PHONE
  // -----------------------------

  const handleEdit = (field) => {
    setEditingField(field);
    setEditValue(personalInfo[field]);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();

    if (!editValue.trim()) {
      alert("Please enter a value.");
      return;
    }

    if (editingField === "email" && !isValidEmail(editValue)) {
      alert(validationMessages.email);
      return;
    }
    if (editingField === "phone" && !isValidPhone(editValue)) {
      alert(validationMessages.phone);
      return;
    }

    setPersonalInfo({
      ...personalInfo,
      [editingField]: editValue,
    });

    setEditingField(null);
    setEditValue("");
  };

  const handleCancelEdit = () => {
    setEditingField(null);
    setEditValue("");
  };

  // -----------------------------
  // PASSWORD
  // -----------------------------

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (
      passwordData.newPassword !==
      passwordData.confirmPassword
    ) {
      alert("New passwords do not match.");
      return;
    }

    if (!isValidPassword(passwordData.newPassword)) {
      alert(validationMessages.password);
      return;
    }

    alert("Password changed successfully.");

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setShowPasswordForm(false);
  };

  const handleCancelPassword = () => {
    setShowPasswordForm(false);

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="security-page">
      <div className="security-wrapper">
 {/* BREADCRUMB */}

      <div className="amazon-breadcrumb">
        <Link to="/account">Your Account</Link>
        <span>›</span>
        <span>Login & Security</span>
      </div>
        {/* HEADER */}

        <div className="security-header">
          <h1>Login & Security</h1>

          <p>
            Manage your login information and account security.
          </p>
        </div>

        {/* MAIN SECURITY CARD */}

        <div className="security-card">

          {/* NAME */}

          <div className="security-row">

            <div className="security-info">
              <span className="security-label">
                Name
              </span>

              <h2>{personalInfo.name}</h2>
            </div>

            <button
              className="security-edit-button"
              onClick={() => handleEdit("name")}
            >
              Edit
            </button>

          </div>

          {/* EMAIL */}

          <div className="security-row">

            <div className="security-info">
              <span className="security-label">
                Email
              </span>

              <h2>{personalInfo.email}</h2>
            </div>

            <button
              className="security-edit-button"
              onClick={() => handleEdit("email")}
            >
              Edit
            </button>

          </div>

          {/* PHONE */}

          <div className="security-row">

            <div className="security-info">
              <span className="security-label">
                Phone number
              </span>

              <h2>
                {personalInfo.phone ||
                  "No phone number added"}
              </h2>
            </div>

            <button
              className="security-edit-button"
              onClick={() => handleEdit("phone")}
            >
              Edit
            </button>

          </div>

          {/* PASSWORD */}

          <div className="security-row">

            <div className="security-info">
              <span className="security-label">
                Password
              </span>

              <h2>••••••••</h2>
            </div>

            <button
              className="security-edit-button"
              onClick={() => setShowPasswordForm(true)}
            >
              Edit
            </button>

          </div>

        </div>

        {/* =========================================
            EDIT NAME / EMAIL / PHONE POPUP
        ========================================= */}

        {editingField && (
          <div
            className="security-modal-overlay"
            onClick={handleCancelEdit}
          >

            <div
              className="security-modal"
              onClick={(e) => e.stopPropagation()}
            >

              <div className="security-modal-header">

                <div>

                  <h2>
                    {editingField === "name" &&
                      "Edit your name"}

                    {editingField === "email" &&
                      "Edit your email"}

                    {editingField === "phone" &&
                      "Edit your phone number"}
                  </h2>

                  <p>
                    Update your account information below.
                  </p>

                </div>

                <button
                  className="security-close-button"
                  onClick={handleCancelEdit}
                >
                  ×
                </button>

              </div>

              <form onSubmit={handleSaveEdit}>

                <div className="security-form-group">

                  <label>

                    {editingField === "name" &&
                      "Your name"}

                    {editingField === "email" &&
                      "Email address"}

                    {editingField === "phone" &&
                      "Phone number"}

                  </label>

                  <input
                    type={
                      editingField === "email"
                        ? "email"
                        : editingField === "phone"
                        ? "tel"
                        : "text"
                    }
                    value={editValue}
                    onChange={(e) =>
                      setEditValue(editingField === "phone" ? sanitizePhone(e.target.value) : e.target.value)
                    }
                    inputMode={editingField === "phone" ? "tel" : undefined}
                    autoFocus
                    required
                  />

                </div>

                <div className="security-form-actions">

                  <button
                    type="button"
                    className="security-cancel-button"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="security-save-button"
                  >
                    Save changes
                  </button>

                </div>

              </form>

            </div>

          </div>
        )}

        {/* =========================================
            PASSWORD POPUP
        ========================================= */}

        {showPasswordForm && (
          <div
            className="security-modal-overlay"
            onClick={handleCancelPassword}
          >

            <div
              className="security-modal"
              onClick={(e) => e.stopPropagation()}
            >

              <div className="security-modal-header">

                <div>

                  <h2>
                    Change your password
                  </h2>

                  <p>
                    Enter your current password and
                    choose a new password.
                  </p>

                </div>

                <button
                  className="security-close-button"
                  onClick={handleCancelPassword}
                >
                  ×
                </button>

              </div>

              <form onSubmit={handlePasswordSubmit}>

                <div className="security-form-group">

                  <label>
                    Current password
                  </label>

                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />

                </div>

                <div className="security-form-group">

                  <label>
                    New password
                  </label>

                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    minLength={7}
                    required
                  />

                </div>

                <div className="security-form-group">

                  <label>
                    Confirm new password
                  </label>

                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    minLength={7}
                    required
                  />

                </div>

                <div className="security-form-actions">

                  <button
                    type="button"
                    className="security-cancel-button"
                    onClick={handleCancelPassword}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="security-save-button"
                  >
                    Change password
                  </button>

                </div>

              </form>

            </div>

          </div>
        )}

        {/* =========================================
            TWO-STEP VERIFICATION
        ========================================= */}

        <div className="security-card security-extra-card">

          <div className="security-extra-icon">
            🛡️
          </div>

          <div>

            <h2>
              Two-Step Verification
            </h2>

            <p>
              Add an extra layer of security to your account.
            </p>

            <button
              type="button"
              className="security-link-button"
              onClick={() => setShowTwoStep(true)}
            >
              Set up
            </button>

          </div>

        </div>

        {/* =========================================
            TWO-STEP VERIFICATION POPUP
        ========================================= */}

        {showTwoStep && (
          <div
            className="security-modal-overlay"
            onClick={() => setShowTwoStep(false)}
          >

            <div
              className="security-two-step-modal"
              onClick={(e) => e.stopPropagation()}
            >

              <TwoStepVerification
                onClose={() => setShowTwoStep(false)}
              />

            </div>

          </div>
        )}

        {/* SIGN OUT */}

        <div className="security-signout-card">

          <div>

            <h2>
              Sign out
            </h2>






            <p>
              Sign out of your account on this device.
            </p>

          </div>

          <button
            className="security-signout-button"
            onClick={logout}
          >
            Sign out
          </button>

        </div>


      </div>
    </div>
  );
}