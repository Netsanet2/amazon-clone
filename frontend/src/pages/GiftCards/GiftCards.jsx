import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./GiftCards.css";

function GiftCards() {
  const [giftCardCode, setGiftCardCode] = useState("");
  const [balance, setBalance] = useState(0);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleRedeem = () => {
    if (!giftCardCode.trim()) {
      setMessage("Please enter a gift card code.");
      setMessageType("error");
      return;
    }

    if (giftCardCode.trim().length < 6) {
      setMessage("Please enter a valid gift card code.");
      setMessageType("error");
      return;
    }

    // Demo behavior
    setBalance((previousBalance) => previousBalance + 50);

    setMessage(
      "Gift card redeemed successfully! $50.00 has been added to your balance."
    );
    setMessageType("success");

    setGiftCardCode("");
  };

  const scrollToRedeem = () => {
    document
      .getElementById("redeem-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="gift-cards-page">
      <div className="gift-cards-container">

        {/* Breadcrumb */}
        <div className="amazon-breadcrumb">
          <Link to="/account">Your Account</Link>
          <span>›</span>
          <span>Gift Cards</span>
        </div>

        {/* Page Header */}
        <div className="gift-cards-header">
          <div>
            <h1>Gift Cards</h1>
            <p>
              Buy, reload, redeem, and manage your gift cards.
            </p>
          </div>

          <button
            className="redeem-header-button"
            onClick={scrollToRedeem}
          >
            Redeem a Gift Card
          </button>
        </div>

        {/* Balance Hero */}
        <section className="gift-balance-card">
          <div className="balance-information">
            <span className="balance-label">
              Your Gift Card Balance
            </span>

            <h2>${balance.toFixed(2)}</h2>

            <p>
              Your available gift card balance can be used on eligible
              purchases.
            </p>

            <button
              className="amazon-yellow-button"
              onClick={scrollToRedeem}
            >
              Redeem a Gift Card
            </button>
          </div>

          <div className="gift-card-visual">
            <div className="gift-card-logo">amazon</div>

            <div className="gift-card-chip"></div>

            <div className="gift-card-number">
              GIFT CARD
            </div>
          </div>
        </section>

        {/* Redeem */}
        <section
          className="gift-section redeem-section"
          id="redeem-section"
        >
          <div className="section-heading">
            <h2>Redeem a Gift Card</h2>
            <p>
              Enter your gift card claim code to add the balance to
              your account.
            </p>
          </div>

          <div className="redeem-box">
            <label htmlFor="giftCardCode">
              Enter your claim code
            </label>

            <div className="redeem-input-row">
              <input
                id="giftCardCode"
                type="text"
                value={giftCardCode}
                onChange={(e) => setGiftCardCode(e.target.value)}
                placeholder="Enter your claim code"
              />

              <button
                className="amazon-yellow-button"
                onClick={handleRedeem}
              >
                Redeem
              </button>
            </div>

            {message && (
              <div className={`gift-message ${messageType}`}>
                {message}
              </div>
            )}

            <p className="redeem-help">
              Gift card claim codes are usually found on the back
              of a physical gift card or in the delivery email.
            </p>
          </div>
        </section>

        {/* Gift Card Options */}
        <section className="gift-section">
          <div className="section-heading">
            <h2>Gift Card Options</h2>
          </div>

          <div className="gift-options-grid">

            <Link
              to="/gift-cards/buy"
              className="gift-option-card"
            >
              <div className="gift-option-icon">🎁</div>

              <div>
                <h3>Buy a Gift Card</h3>
                <p>
                  Send a gift card to someone by email.
                </p>
              </div>

              <span className="option-arrow">›</span>
            </Link>

            <Link
              to="/gift-cards/reload"
              className="gift-option-card"
            >
              <div className="gift-option-icon">💳</div>

              <div>
                <h3>Reload Your Balance</h3>
                <p>
                  Add money to your existing gift card balance.
                </p>
              </div>

              <span className="option-arrow">›</span>
            </Link>

            <Link
              to="/gift-cards/activity"
              className="gift-option-card"
            >
              <div className="gift-option-icon">📋</div>

              <div>
                <h3>Gift Card Activity</h3>
                <p>
                  View your gift card transactions and activity.
                </p>
              </div>

              <span className="option-arrow">›</span>
            </Link>

          </div>
        </section>

        {/* Your Gift Cards */}
        <section className="gift-section">
          <div className="section-heading">
            <h2>Your Gift Cards</h2>
          </div>

          {balance === 0 ? (
            <div className="empty-gift-cards">
              <div className="empty-icon">🎁</div>

              <h3>You don't have any redeemed gift cards yet</h3>

              <p>
                When you redeem a gift card, your available balance
                will appear here.
              </p>

              <button
                className="amazon-yellow-button"
                onClick={scrollToRedeem}
              >
                Redeem a Gift Card
              </button>
            </div>
          ) : (
            <div className="redeemed-gift-card">
              <div className="small-gift-card">
                <span>amazon</span>
              </div>

              <div className="redeemed-info">
                <h3>Amazon Gift Card</h3>

                <p>
                  Available balance:
                </p>

                <strong>
                  ${balance.toFixed(2)}
                </strong>
              </div>
            </div>
          )}
        </section>

        {/* About */}
        <section className="gift-section about-gift-cards">
          <h2>About Gift Cards</h2>

          <div className="about-grid">

            <div>
              <h3>Easy to use</h3>
              <p>
                Gift cards can be used toward eligible purchases
                on Amazon.
              </p>
            </div>

            <div>
              <h3>No expiration</h3>
              <p>
                Your gift card balance remains available for future
                eligible purchases.
              </p>
            </div>

            <div>
              <h3>Give the perfect gift</h3>
              <p>
                Send a gift card to friends and family by email.
              </p>
            </div>

          </div>
        </section>

        {/* Bottom Navigation */}
        <div className="gift-bottom-links">
          <Link to="/account">Your Account</Link>
          <Link to="/orders">Your Orders</Link>
          <Link to="/lists">Your Lists</Link>
        </div>

      </div>
    </div>
  );
}

export default GiftCards;