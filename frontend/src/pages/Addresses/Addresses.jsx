import { useEffect, useState } from "react";
import AddressCard from "../../components/AddressCard/AddressCard";
import AddressForm from "../../components/AddressForm/AddressForm";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  getUserAddresses,
  updateUserAddresses,
} from "../../services/userService";
import "./Addresses.css";

export default function Addresses() {
  const { user } = useAuth();

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  // Load addresses from Firebase
  useEffect(() => {
    const loadAddresses = async () => {
      if (!user?.uid) {
        setAddresses([]);
        setLoading(false);
        return;
      }

      try {
        const savedAddresses = await getUserAddresses(user.uid);
        setAddresses(savedAddresses);
      } catch (error) {
        console.error("Error loading addresses:", error);
        alert("Unable to load your addresses.");
      } finally {
        setLoading(false);
      }
    };

    loadAddresses();
  }, [user?.uid]);

  const handleAdd = () => {
    setEditingAddress(null);
    setShowForm(true);
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this address?"
    );

    if (!confirmed) {
      return;
    }

    const updatedAddresses = addresses.filter(
      (address) => address.id !== id
    );

    // If the deleted address was the default,
    // make the first remaining address the default.
    const deletedAddress = addresses.find(
      (address) => address.id === id
    );

    if (deletedAddress?.isDefault && updatedAddresses.length > 0) {
      updatedAddresses[0].isDefault = true;
    }

    try {
      await updateUserAddresses(user.uid, updatedAddresses);
      setAddresses(updatedAddresses);
    } catch (error) {
      console.error("Error deleting address:", error);
      alert("Unable to delete the address. Please try again.");
    }
  };

  const handleSetDefault = async (id) => {
    const updatedAddresses = addresses.map((address) => ({
      ...address,
      isDefault: address.id === id,
    }));

    try {
      await updateUserAddresses(user.uid, updatedAddresses);
      setAddresses(updatedAddresses);
    } catch (error) {
      console.error("Error setting default address:", error);
      alert("Unable to update the default address.");
    }
  };

  const handleSave = async (addressData) => {
    let updatedAddresses;

    if (editingAddress) {
      updatedAddresses = addresses.map((address) =>
        address.id === editingAddress.id
          ? {
              ...address,
              ...addressData,
              id: editingAddress.id,
            }
          : address
      );
    } else {
      const newAddress = {
        ...addressData,
        id: Date.now(),
        isDefault: addresses.length === 0,
      };

      updatedAddresses = [...addresses, newAddress];
    }

    // If this address is marked as default,
    // make sure all other addresses are not default.
    const savedAddress = editingAddress
      ? updatedAddresses.find(
          (address) => address.id === editingAddress.id
        )
      : updatedAddresses[updatedAddresses.length - 1];

    if (savedAddress?.isDefault) {
      updatedAddresses = updatedAddresses.map((address) => ({
        ...address,
        isDefault: address.id === savedAddress.id,
      }));
    }

    try {
      await updateUserAddresses(user.uid, updatedAddresses);

      setAddresses(updatedAddresses);
      setShowForm(false);
      setEditingAddress(null);
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Unable to save the address. Please try again.");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingAddress(null);
  };

  if (loading) {
    return (
      <div className="addresses-page">
        <div className="addresses-wrapper">
          <p>Loading your addresses...</p>
        </div>
      </div>
    );
  }

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
              <h2>Your saved addresses</h2>

              <span>
                {addresses.length}{" "}
                {addresses.length === 1
                  ? "address"
                  : "addresses"}
              </span>
            </div>

            {addresses.length === 0 ? (
              <div className="empty-addresses">
                <div className="empty-icon">📍</div>

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