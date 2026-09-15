import { useState } from "react";
import AddressCard from "../../components/AddressCard/AddressCard";
import AddressForm from "../../components/AddressForm/AddressForm";
import { Link } from "react-router-dom";
import "./Addresses.css";

export default function Addresses() {

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Saron Teklay",
      street: "Bole Main Road",
      city: "Addis Ababa",
      region: "Addis Ababa",
      country: "Ethiopia",
      phone: "+251 900 000 000",
      isDefault: true,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const handleAdd = () => {
    setEditingAddress(null);
    setShowForm(true);
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this address?"
    );

    if (!confirmed) {
      return;
    }

    setAddresses(
      addresses.filter((address) => address.id !== id)
    );
  };

  const handleSetDefault = (id) => {
    setAddresses(
      addresses.map((address) => ({
        ...address,
        isDefault: address.id === id,
      }))
    );
  };

  const handleSave = (addressData) => {

    if (editingAddress) {

      setAddresses(
        addresses.map((address) =>
          address.id === editingAddress.id
            ? {
                ...address,
                ...addressData,
              }
            : address
        )
      );

    } else {

      const newAddress = {
        ...addressData,
        id: Date.now(),
        isDefault: addresses.length === 0,
      };

      setAddresses([
        ...addresses,
        newAddress,
      ]);
    }

    setShowForm(false);
    setEditingAddress(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingAddress(null);
  };

  return (
    <div className="addresses-page">

      <div className="addresses-wrapper">
        <div className="amazon-breadcrumb">
          <Link to="/account">Your Account</Link>
          <span aria-hidden="true">›</span>
          <span>Your Addresses</span>
        </div>
        <div className="addresses-header">

          <div>
            <h1>Your Addresses</h1>

            <p>
              Manage the addresses you use for orders and gifts.
            </p>
          </div>

          

        </div>

        {!showForm && (
          <button
            className="add-address-button"
            onClick={handleAdd}
          >
            + Add address
          </button>
        )}

        {showForm && (
          <AddressForm
            address={editingAddress}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}

        {!showForm && (
          <>

            <div className="addresses-section-header">
              <h2>
                Your saved addresses
              </h2>

              <span>
                {addresses.length}{" "}
                {addresses.length === 1
                  ? "address"
                  : "addresses"}
              </span>
            </div>

            {addresses.length === 0 ? (

              <div className="empty-addresses">
                <div className="empty-icon">
                  📍
                </div>

                <h2>
                  You don't have any saved addresses
                </h2>

                <p>
                  Add an address to make checkout faster.
                </p>

                <button
                  onClick={handleAdd}
                  className="empty-add-button"
                >
                  Add your first address
                </button>
              </div>

            ) : (

              <div className="addresses-grid">

                {addresses.map((address) => (
                  <AddressCard
                    key={address.id}
                    address={address}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onSetDefault={handleSetDefault}
                  />
                ))}

                <button
                  className="add-address-card"
                  onClick={handleAdd}
                >
                  <span>+</span>
                  <strong>Add address</strong>
                  <p>
                    Add another delivery address
                  </p>
                </button>

              </div>

            )}

          </>
        )}

      </div>

    </div>
  );
}