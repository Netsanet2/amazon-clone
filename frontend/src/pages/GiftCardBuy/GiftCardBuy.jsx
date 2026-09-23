import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  getUserGiftCardActivity,
  updateUserGiftCardActivity,
} from "../../services/userService";
import {
  isValidEmail,
  validationMessages,
} from "../../utils/validation";
import "./GiftCardBuy.css";

function GiftCardBuy() {
  const { user } = useAuth();

  const [amount, setAmount] = useState(25);
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [message, setMessage] = useState("");
  const [delivery, setDelivery] = useState("email");

  const [successMessage, setSuccessMessage] = useState("");
  const [purchasing, setPurchasing] = useState(false);

  const handleBuyGiftCard = async () => {
    setSuccessMessage("");

    if (!user?.uid) {
      alert("Please log in to buy a gift card.");
      return;
    }

    if (!recipientName.trim()) {
      alert("Please enter the recipient's name.");
      return;
    }

    if (!recipientEmail.trim()) {
      alert("Please enter the recipient's email.");
      return;
    }

    if (!isValidEmail(recipientEmail)) {
      alert(validationMessages.email);
      return;
    }

    try {
      setPurchasing(true);

      // Get existing gift card activity
      const existingActivity =
        await getUserGiftCardActivity(user.uid);

      // Create a new purchase activity
      const newActivity = {
        id: Date.now().toString(),
        description: `Gift card purchase for ${recipientName.trim()}`,
        amount: amount,
        type: "debit",
        date: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        recipientName: recipientName.trim(),
        recipientEmail: recipientEmail.trim(),
        delivery,
        message: message.trim(),
      };

      // Save the purchase to Firebase
      await updateUserGiftCardActivity(user.uid, [
        newActivity,
        ...existingActivity,
      ]);

      setSuccessMessage(
        `Your $${amount} gift card purchase has been recorded successfully.`
      );

      // Clear the form
      setRecipientName("");
      setRecipientEmail("");
      setMessage("");
    } catch (error) {
      console.error("Error purchasing gift card:", error);

      alert(
        "Unable to complete the gift card purchase. Please try again."
      );
    } finally {
      setPurchasing(false);
    }
  };

  return (
    <div className="gift-buy-page">
      <div className="gift-buy-container">

        {/* Breadcrumb */}
        <div className="amazon-breadcrumb">
          <Link to="/account">Your Account</Link>
          <span>›</span>
          <Link to="/gift-cards">Gift Cards</Link>
          <span>›</span>
          <span>Buy a Gift Card</span>
        </div>

        {/* Header */}
        <div className="gift-buy-header">
          <h1>Buy a Gift Card</h1>
          <p>
            Give someone special the freedom to choose what they want.
          </p>
        </div>

        {/* Main Content */}
        <div className="gift-buy-layout">

          {/* Left Preview */}
          <div className="gift-buy-preview-card">
            <div className="large-gift-card">
              <div className="large-gift-card-brand">
                amazon
              </div>

              <div className="large-gift-card-value">
                ${amount}
              </div>

              <div className="large-gift-card-text">
                Gift Card
              </div>
            </div>

            <h3>Gift Card Preview</h3>

            <p>
              Your recipient will receive an Amazon gift card
              worth ${amount}.
            </p>
          </div>

          {/* Right Form */}
          <div className="gift-buy-form-card">

            <h2>Choose an amount</h2>

            <div className="amount-options">
              {[25, 50, 75, 100].map((value) => (
                <button
                  key={value}
                  type="button"
                  className={
                    amount === value
                      ? "amount-button selected"
                      : "amount-button"
                  }
                  onClick={() => setAmount(value)}
                >
                  ${value}
                </button>
              ))}
            </div>

            <div className="form-divider"></div>

            <h2>Recipient information</h2>

            <div className="gift-form-group">
              <label htmlFor="recipientName">
                Recipient's name
              </label>

              <input
                id="recipientName"
                type="text"
                value={recipientName}
                onChange={(e) =>
                  setRecipientName(e.target.value)
                }
                placeholder="Enter recipient's name"
              />
            </div>

            <div className="gift-form-group">
              <label htmlFor="recipientEmail">
                Recipient's email
              </label>

              <input
                id="recipientEmail"
                type="email"
                value={recipientEmail}
                onChange={(e) =>
                  setRecipientEmail(e.target.value)
                }
                placeholder="example@email.com"
              />
            </div>

            <div className="form-divider"></div>

            <h2>Delivery</h2>

            <label className="delivery-option">
              <input
                type="radio"
                name="delivery"
                value="email"
                checked={delivery === "email"}
                onChange={(e) =>
                  setDelivery(e.target.value)
                }
              />

              <span>
                <strong>Email delivery</strong>
                <small>
                  Send the gift card directly to the recipient.
                </small>
              </span>
            </label>

            <label className="delivery-option">
              <input
                type="radio"
                name="delivery"
                value="schedule"
                checked={delivery === "schedule"}
                onChange={(e) =>
                  setDelivery(e.target.value)
                }
              />

              <span>
                <strong>Schedule delivery</strong>
                <small>
                  Choose when the gift card should be delivered.
                </small>
              </span>
            </label>

            <div className="form-divider"></div>

            <div className="gift-form-group">
              <label htmlFor="giftMessage">
                Personal message
              </label>

              <textarea
                id="giftMessage"
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                placeholder="Add a message (optional)"
                maxLength={200}
              />

              <span className="character-count">
                {message.length}/200
              </span>
            </div>

            {/* Summary */}
            <div className="gift-buy-summary">

              <div>
                <span>Gift card amount</span>
                <strong>${amount}.00</strong>
              </div>

              <div>
                <span>Delivery</span>
                <strong>
                  {delivery === "email"
                    ? "Email"
                    : "Scheduled"}
                </strong>
              </div>

              <div className="summary-total">
                <span>Total</span>
                <strong>${amount}.00</strong>
              </div>

            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="gift-buy-success">
                {successMessage}
              </div>
            )}

            {/* Buy Button */}
            <button
              type="button"
              className="buy-gift-card-button"
              onClick={handleBuyGiftCard}
              disabled={purchasing}
            >
              {purchasing
                ? "Processing..."
                : "Buy Gift Card"}
            </button>

            {/* Add to Cart */}
            <button
              type="button"
              className="add-cart-demo-button"
              onClick={() =>
                alert(
                  "Add to Cart will be connected to the team CartContext during integration."
                )
              }
            >
              Add to Cart
            </button>

          </div>
        </div>

        {/* Keep the rest of your existing information
            and bottom navigation sections unchanged. */}

      </div>
    </div>
  );
}

export default GiftCardBuy;