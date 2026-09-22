import { useState } from "react";
import { isValidPhone, sanitizePhone, validationMessages } from "../../utils/validation";
import "./AddressForm.css";

export default function AddressForm({
  address,
  onSave,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    name: address?.name || "",
    street: address?.street || "",
    city: address?.city || "",
    region: address?.region || "",
    country: address?.country || "",
    phone: address?.phone || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "phone" ? sanitizePhone(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidPhone(formData.phone)) {
      alert(validationMessages.phone);
      return;
    }

    onSave({
      ...formData,
      id: address?.id,
      isDefault: address?.isDefault || false,
    });
  };

  return (
    <div className="address-form-card">

      <div className="address-form-header">
        <h2>
          {address ? "Edit address" : "Add a new address"}
        </h2>

        <button
          type="button"
          className="form-close-button"
          onClick={onCancel}
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Full name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Street address</label>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="House number and street"
            required
          />
        </div>

        <div className="form-row">

          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Region</label>
            <input
              type="text"
              name="region"
              value={formData.region}
              onChange={handleChange}
              required
            />
          </div>

        </div>

        <div className="form-row">

          <div className="form-group">
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              inputMode="tel"
              required
            />
          </div>

        </div>

        <div className="form-actions">

          <button
            type="button"
            className="cancel-address-button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="save-address-button"
          >
            {address ? "Save changes" : "Add address"}
          </button>

        </div>

      </form>
    </div>
  );
}