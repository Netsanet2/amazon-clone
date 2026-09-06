import "./PaymentMethodCard.css";

export default function PaymentMethodCard({
  payment,
  onEdit,
  onDelete,
  onSetDefault,
}) {
  return (
    <div
      className={`payment-card ${
        payment.isDefault ? "default-payment" : ""
      }`}
    >
      {payment.isDefault && (
        <div className="default-payment-badge">
          Default payment method
        </div>
      )}

      <div className="payment-card-top">
        <div className="card-icon">
          
        </div>

        <div className="payment-info">
          <h2>{payment.cardType}</h2>

          <p className="card-number">
            •••• •••• •••• {payment.last4}
          </p>

          <p className="card-name">
            {payment.name}
          </p>

          <p className="card-expiry">
            Expires {payment.expiry}
          </p>
        </div>
      </div>

      <div className="payment-actions">
        <button onClick={() => onEdit(payment)}>
          Edit
        </button>

        <button onClick={() => onDelete(payment.id)}>
          Delete
        </button>

        {!payment.isDefault && (
          <button onClick={() => onSetDefault(payment.id)}>
            Set as default
          </button>
        )}
      </div>
    </div>
  );
}