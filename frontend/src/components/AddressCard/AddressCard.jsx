import "./AddressCard.css";

export default function AddressCard({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}) {
  return (
    <div className={`address-card ${address.isDefault ? "default-address" : ""}`}>
      
      {address.isDefault && (
        <div className="default-badge">
          Default address
        </div>
      )}

      <div className="address-card-content">
        <h2>{address.name}</h2>

        <p>{address.street}</p>
        <p>
          {address.city}, {address.region}
        </p>
        <p>{address.country}</p>

        <p className="address-phone">
          Phone: {address.phone}
        </p>
      </div>

      <div className="address-actions">
        <button onClick={() => onEdit(address)}>
          Edit
        </button>

        <button onClick={() => onDelete(address.id)}>
          Delete
        </button>

        {!address.isDefault && (
          <button onClick={() => onSetDefault(address.id)}>
            Set as default
          </button>
        )}
      </div>
    </div>
  );
}