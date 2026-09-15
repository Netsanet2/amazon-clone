import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./GiftCardReload.css";

function GiftCardReload() {
  const [amount, setAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("visa");
  const [successMessage, setSuccessMessage] = useState("");

  const selectedAmount =
    customAmount !== ""
      ? Number(customAmount)
      : amount;

  const handleReload = () => {
    if (!selectedAmount || selectedAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    if (selectedAmount > 500) {
      alert("The maximum reload amount is $500.");
      return;
    }

    // Demo behavior
    setSuccessMessage(
      `$${selectedAmount.toFixed(
        2
      )} has been added to your gift card balance.`
    );
  };

  const handlePresetAmount = (value) => {
    setAmount(value);
    setCustomAmount("");
    setSuccessMessage("");
  };

  return (
    <div className="gift-reload-page">
      <div className="gift-reload-container">

        {/* Breadcrumb */}
        <div className="amazon-breadcrumb">
          <Link to="/account">Your Account</Link>
          <span>›</span>

          <Link to="/gift-cards">Gift Cards</Link>
          <span>›</span>

          <span>Reload Your Balance</span>
        </div>

        {/* Header */}
        <div className="gift-reload-header">
          <h1>Reload Your Balance</h1>

          <p>
            Add funds to your Amazon gift card balance.
          </p>
        </div>

        {/* Main Layout */}
        <div className="gift-reload-layout">

          {/* Form */}
          <div className="gift-reload-form-card">

            <h2>Choose an amount</h2>

            <div className="reload-amount-options">

              {[10, 25, 50, 100].map((value) => (
                <button
                  key={value}
                  className={
                    amount === value && customAmount === ""
                      ? "reload-amount-button selected"
                      : "reload-amount-button"
                  }
                  onClick={() =>
                    handlePresetAmount(value)
                  }
                >
                  ${value}
                </button>
              ))}

            </div>

            <div className="reload-form-group">

              <label htmlFor="customAmount">
                Or enter a custom amount
              </label>

              <div className="custom-amount-wrapper">
                <span>$</span>

                <input
                  id="customAmount"
                  type="number"
                  min="1"
                  max="500"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSuccessMessage("");
                  }}
                  placeholder="Enter amount"
                />
              </div>

              <small>
                You can reload up to $500 at a time.
              </small>

            </div>

            <div className="reload-divider"></div>

            <h2>Payment method</h2>

            <label className="reload-payment-option">

              <input
                type="radio"
                name="payment"
                value="visa"
                checked={paymentMethod === "visa"}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />

              <div>
                <strong>Visa ending in 1111</strong>

                <span>
                  Your saved payment method
                </span>
              </div>

            </label>

            <label className="reload-payment-option">

              <input
                type="radio"
                name="payment"
                value="another"
                checked={paymentMethod === "another"}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />

              <div>
                <strong>Another payment method</strong>

                <span>
                  Choose a different payment method
                </span>
              </div>

            </label>

            <div className="reload-divider"></div>

            {/* Summary */}
            <div className="reload-summary">

              <div>
                <span>Current balance</span>
                <strong>$0.00</strong>
              </div>

              <div>
                <span>Reload amount</span>

                <strong>
                  ${selectedAmount.toFixed(2)}
                </strong>
              </div>

              <div className="reload-total">
                <span>New balance</span>

                <strong>
                  ${selectedAmount.toFixed(2)}
                </strong>
              </div>

            </div>

            {successMessage && (
              <div className="reload-success">
                {successMessage}
              </div>
            )}

            <button
              className="reload-now-button"
              onClick={handleReload}
            >
              Reload Now
            </button>

          </div>

          {/* Information */}
          <aside className="gift-reload-info">

            <div className="info-card">

              <h2>Gift Card Balance</h2>

              <div className="info-balance">
                $0.00
              </div>

              <p>
                Your current gift card balance is shown above.
                Reloading adds funds that can be used toward
                eligible purchases.
              </p>

            </div>

            <div className="info-card">

              <h2>Why reload?</h2>

              <ul>
                <li>
                  Keep your gift card balance ready for shopping.
                </li>

                <li>
                  Add funds whenever you need them.
                </li>

                <li>
                  Use your balance toward eligible purchases.
                </li>
              </ul>

            </div>

          </aside>

        </div>

        {/* Bottom Navigation */}
        <div className="gift-reload-bottom-links">

          <Link to="/gift-cards">
            Gift Cards
          </Link>

          <Link to="/account">
            Your Account
          </Link>

          <Link to="/orders">
            Your Orders
          </Link>

        </div>

      </div>
    </div>
  );
}

export default GiftCardReload;