import { useEffect, useState } from "react";
import {
  isValidEmail,
  isValidPhone,
  sanitizePhone,
  validationMessages,
} from "../../utils/validation";

import {
  getUserProfile,
  updateUserProfile,
} from "../../services/userService";

import "./PersonalInfoCard.css";

export default function PersonalInfoCard({ user }) {
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Load the user's profile from Firestore
  useEffect(() => {
    const loadUserProfile = async () => {
      if (!user?.uid) {
        setLoading(false);
        return;
      }

      try {
        const profile = await getUserProfile(user.uid);

        if (profile) {
          setPersonalInfo({
            name: profile.name || user.name || "Customer Name",
            email: profile.email || user.email || "customer@example.com",
            phone: profile.phone || "",
          });
        } else {
          setPersonalInfo({
            name: user.name || "Customer Name",
            email: user.email || "customer@example.com",
            phone: user.phone || "",
          });
        }
      } catch (error) {
        console.error("Error loading user profile:", error);

        setPersonalInfo({
          name: user.name || "Customer Name",
          email: user.email || "customer@example.com",
          phone: user.phone || "",
        });
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, [user]);

  // Start editing a field
  const startEditing = (field) => {
    setEditingField(field);
    setEditValue(personalInfo[field]);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingField(null);
    setEditValue("");
  };

  // Save the edited field
  const saveEditing = async () => {
    // Validate email
    if (editingField === "email" && !isValidEmail(editValue)) {
      alert(validationMessages.email);
      return;
    }

    // Validate phone
    if (editingField === "phone" && !isValidPhone(editValue)) {
      alert(validationMessages.phone);
      return;
    }

    // Make sure we have the user's Firebase UID
    if (!user?.uid) {
      alert("Unable to identify your account.");
      return;
    }

    // Email changes need Firebase Authentication.
    // We will implement this separately.
    if (editingField === "email") {
      alert(
        "Email changes will be connected to Firebase Authentication separately."
      );
      return;
    }

    try {
      setSaving(true);

      // Update the user's profile in Firestore
      await updateUserProfile(user.uid, {
        [editingField]: editValue,
      });

      // Update the screen after Firestore succeeds
      setPersonalInfo((previousInfo) => ({
        ...previousInfo,
        [editingField]: editValue,
      }));

      // Close the modal
      setEditingField(null);
      setEditValue("");
    } catch (error) {
      console.error("Error updating user profile:", error);

      alert("Unable to save your changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Get the title for the edit modal
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

  // Show loading message while Firestore profile is loading
  if (loading) {
    return (
      <div className="personal-info-card">
        <div className="personal-info-header">
          <div>
            <h2>Account information</h2>
            <p>Loading your personal information...</p>
          </div>

          <div className="profile-icon">👤</div>
        </div>
      </div>
    );
  }

  return (
    <div className="personal-info-card">
      {/* Header */}
      <div className="personal-info-header">
        <div>
          <h2>Account information</h2>
          <p>Keep your personal information up to date.</p>
        </div>

        <div className="profile-icon">👤</div>
      </div>

      {/* Name */}
      <div className="personal-info-row">
        <div className="personal-info-content">
          <span className="info-label">Name</span>

          <h3>{personalInfo.name}</h3>

          <p>Your name is used on your account and orders.</p>
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

          <h3>{personalInfo.email}</h3>

          <p>Your email is used for account notifications.</p>
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

          <p>Add a phone number to help secure your account.</p>
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
            {/* Modal Header */}
            <div className="edit-modal-header">
              <h2>{getFieldTitle()}</h2>

              <button
                className="close-button"
                onClick={cancelEditing}
                disabled={saving}
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
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
                onChange={(e) =>
                  setEditValue(
                    editingField === "phone"
                      ? sanitizePhone(e.target.value)
                      : e.target.value
                  )
                }
                inputMode={
                  editingField === "phone" ? "tel" : undefined
                }
                autoFocus
                disabled={saving}
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

            {/* Modal Footer */}
            <div className="edit-modal-footer">
              <button
                className="cancel-button"
                onClick={cancelEditing}
                disabled={saving}
              >
                Cancel
              </button>

              <button
                className="save-button"
                onClick={saveEditing}
                disabled={!editValue.trim() || saving}
              >
                {saving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}