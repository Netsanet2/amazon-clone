import { useEffect, useState } from "react";
import PaymentMethodCard from "../../components/PaymentMethodCard/PaymentMethodCard";
import PaymentMethodForm from "../../components/PaymentMethodForm/PaymentMethodForm";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  getUserPayments,
  updateUserPayments,
} from "../../services/userService";
import "./PaymentMethods.css";

export default function PaymentMethods() {
  const { user } = useAuth();

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);

  // Load payment methods from Firebase
  useEffect(() => {
    const loadPayments = async () => {
      if (!user?.uid) {
        setPayments([]);
        setLoading(false);
        return;
      }

      try {
        const savedPayments = await getUserPayments(user.uid);
        setPayments(savedPayments);
      } catch (error) {
        console.error("Error loading payment methods:", error);
        alert("Unable to load your payment methods.");
      } finally {
        setLoading(false);
      }
    };

    loadPayments();
  }, [user?.uid]);

  // Open the form for adding a new payment method
  const handleAdd = () => {
    setEditingPayment(null);
    setShowForm(true);
  };

  // Open the form for editing an existing payment method
  const handleEdit = (payment) => {
    setEditingPayment(payment);
    setShowForm(true);
  };

  // Delete a payment method
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this payment method?"
    );

    if (!confirmed) {
      return;
    }

    const deletedPayment = payments.find(
      (payment) => payment.id === id
    );

    let updatedPayments = payments.filter(
      (payment) => payment.id !== id
    );

    // If the deleted payment was the default,
    // make the first remaining payment the default.
    if (deletedPayment?.isDefault && updatedPayments.length > 0) {
      updatedPayments = updatedPayments.map((payment, index) => ({
        ...payment,
        isDefault: index === 0,
      }));
    }

    try {
      await updateUserPayments(user.uid, updatedPayments);
      setPayments(updatedPayments);
    } catch (error) {
      console.error("Error deleting payment method:", error);
      alert(
        "Unable to delete the payment method. Please try again."
      );
    }
  };

  // Make a payment method the default
  const handleSetDefault = async (id) => {
    const updatedPayments = payments.map((payment) => ({
      ...payment,
      isDefault: payment.id === id,
    }));

    try {
      await updateUserPayments(user.uid, updatedPayments);
      setPayments(updatedPayments);
    } catch (error) {
      console.error(
        "Error setting default payment method:",
        error
      );
      alert("Unable to update the default payment method.");
    }
  };

  // Save either a new payment method or an edited payment method
  const handleSave = async (paymentData) => {
    let updatedPayments;

    if (editingPayment) {
      updatedPayments = payments.map((payment) =>
        payment.id === editingPayment.id
          ? {
              ...payment,
              ...paymentData,
              id: editingPayment.id,
            }
          : payment
      );
    } else {
      const newPayment = {
        ...paymentData,
        id: Date.now(),
        isDefault: payments.length === 0,
      };

      updatedPayments = [...payments, newPayment];
    }

    // If this payment is default,
    // make sure all other payments are not default.
    const savedPayment = editingPayment
      ? updatedPayments.find(
          (payment) => payment.id === editingPayment.id
        )
      : updatedPayments[updatedPayments.length - 1];

    if (savedPayment?.isDefault) {
      updatedPayments = updatedPayments.map((payment) => ({
        ...payment,
        isDefault: payment.id === savedPayment.id,
      }));
    }

    try {
      await updateUserPayments(user.uid, updatedPayments);

      setPayments(updatedPayments);
      setShowForm(false);
      setEditingPayment(null);
    } catch (error) {
      console.error("Error saving payment method:", error);
      alert(
        "Unable to save the payment method. Please try again."
      );
    }
  };

  // Close the form
  const handleCancel = () => {
    setShowForm(false);
    setEditingPayment(null);
  };

  if (loading) {
    return (
      <div className="payments-page">
        <div className="payments-wrapper">
          <p>Loading your payment methods...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="payments-page">
      <div className="payments-wrapper">
        <div className="amazon-breadcrumb">
          <Link to="/account">Your Account</Link>
          <span>›</span>
          <span>Your Payments</span>
        </div>

        <div className="payments-header">
          <div>
            <h1>Your Payments</h1>

            <p>
              Manage your payment methods and billing information.
            </p>
          </div>
        </div>

        {!showForm && (
          <button
            className="add-payment-button"
            onClick={handleAdd}
          >
            + Add a payment method
          </button>
        )}

        {showForm && (
          <PaymentMethodForm
            payment={editingPayment}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}

        {!showForm && (
          <>
            <div className="payments-section-header">
              <h2>Your payment methods</h2>

              <span>
                {payments.length}{" "}
                {payments.length === 1
                  ? "payment method"
                  : "payment methods"}
              </span>
            </div>

            {payments.length === 0 ? (
              <div className="empty-payments">
                <h2>
                  You don't have any saved payment methods
                </h2>

                <p>
                  Add a payment method to make checkout faster.
                </p>

                <button
                  className="empty-add-payment-button"
                  onClick={handleAdd}
                >
                  Add your first payment method
                </button>
              </div>
            ) : (
              <div className="payments-grid">
                {payments.map((payment) => (
                  <PaymentMethodCard
                    key={payment.id}
                    payment={payment}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onSetDefault={handleSetDefault}
                  />
                ))}

                <button
                  className="add-payment-card"
                  onClick={handleAdd}
                >
                  <span>+</span>

                  <strong>
                    Add a payment method
                  </strong>

                  <p>
                    Add another card
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