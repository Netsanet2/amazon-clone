import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./GiftCardBuy.css";

function GiftCardBuy() {
  const [amount, setAmount] = useState(25);
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [message, setMessage] = useState("");
  const [delivery, setDelivery] = useState("email");
  const [successMessage, setSuccessMessage] = useState("");

  const handleBuyGiftCard = () => {
    if (!recipientName.trim()) {
      alert("Please enter the recipient's name.");
      return;
    }

    if (!recipientEmail.trim()) {
      alert("Please enter the recipient's email.");
      return;
    }

    // Demo behavior
    setSuccessMessage(
      `Your $${amount} gift card is ready to be sent to ${recipientEmail}.`
    );
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
            Give someone special the freedom to choose what they
            want.
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
                onChange={(e) => setMessage(e.target.value)}
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

            {successMessage && (
              <div className="gift-buy-success">
                {successMessage}
              </div>
            )}

            <button
              className="buy-gift-card-button"
              onClick={handleBuyGiftCard}
            >
              Buy Gift Card
            </button>

            {/* Temporary integration button */}
            <button
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

        {/* Information */}
        <section className="gift-buy-information">

          <h2>About Amazon Gift Cards</h2>

          <div className="information-grid">

            <div>
              <h3>Choose your amount</h3>
              <p>
                Select the gift card amount that works best for
                you.
              </p>
            </div>

            <div>
              <h3>Send it by email</h3>
              <p>
                Enter the recipient's email address to send the
                gift card electronically.
              </p>
            </div>

            <div>
              <h3>Use it on Amazon</h3>
              <p>
                The recipient can use the gift card balance toward
                eligible purchases.
              </p>
            </div>

          </div>

        </section>

        {/* Bottom Navigation */}
        <div className="gift-buy-bottom-links">
          <Link to="/gift-cards">Gift Cards</Link>
          <Link to="/account">Your Account</Link>
          <Link to="/orders">Your Orders</Link>
        </div>

      </div>
    </div>
  );
}

export default GiftCardBuy;