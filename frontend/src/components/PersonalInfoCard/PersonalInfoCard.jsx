import { useState } from "react";
import { isValidEmail, isValidPhone, sanitizePhone, validationMessages } from "../../utils/validation";
import "./PersonalInfoCard.css";

export default function PersonalInfoCard({ user }) {

  const [personalInfo, setPersonalInfo] = useState({
    name: user?.name || "Customer Name",
    email: user?.email || "customer@example.com",
    phone: user?.phone || "",
  });

  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState("");

  const startEditing = (field) => {
    setEditingField(field);
    setEditValue(personalInfo[field]);
  };

  const cancelEditing = () => {
    setEditingField(null);
    setEditValue("");
  };

  const saveEditing = () => {
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

  const getFieldTitle = () => {
    if (editingField === "name") {
      return "Edit your name";
    }

    if (editingField === "email") {
      return "Edit your email";
    }

    if (editingField === "phone") {
      return "Edit your phone number";
    }

    return "";
  };

  return (
    <div className="personal-info-card">

      {/* Header */}
      <div className="personal-info-header">
        <div>
          <h2>Account information</h2>
          <p>
            Keep your personal information up to date.
          </p>
        </div>

        <div className="profile-icon">
          👤
        </div>
      </div>


      {/* Name */}
      <div className="personal-info-row">

        <div className="personal-info-content">
          <span className="info-label">Name</span>

          <h3>
            {personalInfo.name}
          </h3>

          <p>
            Your name is used on your account and orders.
          </p>
        </div>

        <button
          className="edit-button"
          onClick={() => startEditing("name")}
        >
          Edit
        </button>

      </div>


      {/* Email */}
      <div className="personal-info-row">

        <div className="personal-info-content">
          <span className="info-label">Email</span>

          <h3>
            {personalInfo.email}
          </h3>

          <p>
            Your email is used for account notifications.
          </p>
        </div>

        <button
          className="edit-button"
          onClick={() => startEditing("email")}
        >
          Edit
        </button>

      </div>


      {/* Phone */}
      <div className="personal-info-row">

        <div className="personal-info-content">
          <span className="info-label">Phone number</span>

          <h3>
            {personalInfo.phone || "No phone number added"}
          </h3>

          <p>
            Add a phone number to help secure your account.
          </p>
        </div>

        <button
          className="edit-button"
          onClick={() => startEditing("phone")}
        >
          Edit
        </button>

      </div>


      {/* Information notice */}
      <div className="info-notice">
        <span>🔒</span>

        <p>
          Your personal information is kept private and secure.
        </p>
      </div>


      {/* Edit Modal */}
      {editingField && (
        <div className="edit-overlay">

          <div className="edit-modal">

            <div className="edit-modal-header">
              <h2>{getFieldTitle()}</h2>

              <button
                className="close-button"
                onClick={cancelEditing}
              >
                ×
              </button>
            </div>


            <div className="edit-modal-body">

              <label>
                {editingField === "name" && "Your name"}

                {editingField === "email" && "Email address"}

                {editingField === "phone" && "Phone number"}
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
                onChange={(e) => setEditValue(editingField === "phone" ? sanitizePhone(e.target.value) : e.target.value)}
                inputMode={editingField === "phone" ? "tel" : undefined}
                autoFocus
              />

              {editingField === "email" && (
                <p className="input-help">
                  Make sure you enter an email address that you can access.
                </p>
              )}

              {editingField === "phone" && (
                <p className="input-help">
                  Include your country code when entering your phone number.
                </p>
              )}

            </div>


            <div className="edit-modal-footer">

              <button
                className="cancel-button"
                onClick={cancelEditing}
              >
                Cancel
              </button>

              <button
                className="save-button"
                onClick={saveEditing}
                disabled={!editValue.trim()}
              >
                Save changes
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}