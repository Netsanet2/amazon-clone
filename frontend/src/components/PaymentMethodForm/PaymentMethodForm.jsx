import { useState } from "react";
import "./PaymentMethodForm.css";

export default function PaymentMethodForm({
  payment,
  onSave,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    cardType: payment?.cardType || "Visa",
    last4: payment?.last4 || "",
    name: payment?.name || "",
    expiry: payment?.expiry || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...formData,
      id: payment?.id,
      isDefault: payment?.isDefault || false,
    });
  };

  return (
    <div className="payment-form-card">

      <div className="payment-form-header">
        <div>
          <h2>
            {payment
              ? "Edit payment method"
              : "Add a payment method"}
          </h2>

          <p>
            Enter your payment information below.
          </p>
        </div>

        <button
          type="button"
          className="payment-close-button"
          onClick={onCancel}
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Card type</label>

          <select
            name="cardType"
            value={formData.cardType}
            onChange={handleChange}
          >
            <option value="Visa">Visa</option>
            <option value="Mastercard">Mastercard</option>
            <option value="American Express">
              American Express
            </option>
            <option value="Discover">Discover</option>
          </select>
        </div>

        <div className="form-group">
          <label>Last 4 digits of card</label>

          <input
            type="text"
            name="last4"
            value={formData.last4}
            onChange={handleChange}
            placeholder="1234"
            maxLength="4"
            inputMode="numeric"
            required
          />

          <small>
            For this frontend demo, enter only the last 4 digits.
          </small>
        </div>

        <div className="form-group">
          <label>Name on card</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Saron Teklay"
            required
          />
        </div>

        <div className="form-group">
          <label>Expiration date</label>

          <input
            type="text"
            name="expiry"
            value={formData.expiry}
            onChange={handleChange}
            placeholder="MM/YY"
            maxLength="5"
            required
          />
        </div>


        <div className="payment-form-actions">

          <button
            type="button"
            className="cancel-payment-button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="save-payment-button"
          >
            {payment
              ? "Save changes"
              : "Add payment method"}
          </button>

        </div>

      </form>
    </div>
  );
}