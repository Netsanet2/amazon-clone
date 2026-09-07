import { useState } from "react";
import PaymentMethodCard from "../../components/PaymentMethodCard/PaymentMethodCard";
import PaymentMethodForm from "../../components/PaymentMethodForm/PaymentMethodForm";
import { Link } from "react-router-dom";
import "./PaymentMethods.css";

export default function PaymentMethods() {
  const [payments, setPayments] = useState([
    {
      id: 1,
      cardType: "Visa",
      last4: "4242",
      name: "Saron Teklay",
      expiry: "12/28",
      isDefault: true,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);

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
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this payment method?"
    );

    if (!confirmed) {
      return;
    }

    setPayments(
      payments.filter((payment) => payment.id !== id)
    );
  };

  // Make a payment method the default
  const handleSetDefault = (id) => {
    setPayments(
      payments.map((payment) => ({
        ...payment,
        isDefault: payment.id === id,
      }))
    );
  };

  // Save either a new payment or an edited payment
  const handleSave = (paymentData) => {
    if (editingPayment) {
      // Editing existing payment
      setPayments(
        payments.map((payment) =>
          payment.id === editingPayment.id
            ? {
                ...payment,
                ...paymentData,
              }
            : payment
        )
      );
    } else {
      // Adding new payment
      const newPayment = {
        ...paymentData,
        id: Date.now(),
        isDefault: payments.length === 0,
      };

      setPayments([
        ...payments,
        newPayment,
      ]);
    }

    setShowForm(false);
    setEditingPayment(null);
  };

  // Close the form
  const handleCancel = () => {
    setShowForm(false);
    setEditingPayment(null);
  };

  return (
    <div className="payments-page">
      <div className="payments-wrapper">
<div className="amazon-breadcrumb">
  <Link to="/account">Your Account</Link>
  <span>›</span>
  <span>Your Payments</span>
</div>
        {/* Page header */}
        <div className="payments-header">
          <div>
            <h1>Your Payments</h1>

            <p>
              Manage your payment methods and billing information.
            </p>
          </div>

          
        </div>

        {/* Add button */}
        {!showForm && (
          <button
            className="add-payment-button"
            onClick={handleAdd}
          >
            + Add a payment method
          </button>
        )}

        {/* Add/Edit form */}
        {showForm && (
          <PaymentMethodForm
            payment={editingPayment}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}

        {/* Payment methods */}
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

                {/* Add another card */}
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