import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  getUserGiftCardBalance,
  updateUserGiftCardBalance,
  getUserGiftCardActivity,
  updateUserGiftCardActivity,
} from "../../services/userService";
import "./GiftCards.css";

function GiftCards() {
  const { user } = useAuth();

  const [giftCardCode, setGiftCardCode] = useState("");
  const [balance, setBalance] = useState(0);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [loading, setLoading] = useState(true);
  const [redeeming, setRedeeming] = useState(false);

  /* =====================================================
     LOAD GIFT CARD BALANCE FROM FIREBASE
  ===================================================== */

  useEffect(() => {
    const loadGiftCardBalance = async () => {
      if (!user?.uid) {
        setBalance(0);
        setLoading(false);
        return;
      }

      try {
        const savedBalance =
          await getUserGiftCardBalance(user.uid);

        setBalance(savedBalance);
      } catch (error) {
        console.error(
          "Error loading gift card balance:",
          error
        );

        setMessage(
          "Unable to load your gift card balance."
        );

        setMessageType("error");
      } finally {
        setLoading(false);
      }
    };

    loadGiftCardBalance();
  }, [user?.uid]);

  /* =====================================================
     REDEEM GIFT CARD
  ===================================================== */

  const handleRedeem = async () => {
    if (!giftCardCode.trim()) {
      setMessage(
        "Please enter a gift card code."
      );
      setMessageType("error");
      return;
    }

    if (giftCardCode.trim().length < 6) {
      setMessage(
        "Please enter a valid gift card code."
      );
      setMessageType("error");
      return;
    }

    if (!user?.uid) {
      setMessage(
        "Please log in to redeem a gift card."
      );
      setMessageType("error");
      return;
    }

    try {
      setRedeeming(true);

      // Demo behavior:
      // Each valid-looking code adds $50.
      const redeemedAmount = 50;
      const newBalance = balance + redeemedAmount;

      // Get existing gift card activity
      const existingActivity =
        await getUserGiftCardActivity(user.uid);

      // Create new redemption activity
      const newActivity = {
        id: Date.now().toString(),
        description: "Gift card redeemed",
        amount: redeemedAmount,
        type: "credit",
        date: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
      };

      // Save updated balance to Firebase
      await updateUserGiftCardBalance(
        user.uid,
        newBalance
      );

      // Save redemption activity to Firebase
      await updateUserGiftCardActivity(
        user.uid,
        [
          newActivity,
          ...existingActivity,
        ]
      );

      // Update the displayed balance
      setBalance(newBalance);

      setMessage(
        "Gift card redeemed successfully! $50.00 has been added to your balance."
      );

      setMessageType("success");

      setGiftCardCode("");
    } catch (error) {
      console.error(
        "Error redeeming gift card:",
        error
      );

      setMessage(
        "Unable to redeem the gift card. Please try again."
      );

      setMessageType("error");
    } finally {
      setRedeeming(false);
    }
  };

  /* =====================================================
     SCROLL TO REDEEM SECTION
  ===================================================== */

  const scrollToRedeem = () => {
    document
      .getElementById("redeem-section")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="gift-cards-page">
        <div className="gift-cards-container">
          <p>Loading your gift card balance...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="gift-cards-page">
      <div className="gift-cards-container">

        {/* Breadcrumb */}

        <div className="amazon-breadcrumb">
          <Link to="/account">
            Your Account
          </Link>

          <span>›</span>

          <span>Gift Cards</span>
        </div>

        {/* Page Header */}

        <div className="gift-cards-header">
          <div>
            <h1>Gift Cards</h1>

            <p>
              Buy, reload, redeem, and manage
              your gift cards.
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

            <h2>
              ${balance.toFixed(2)}
            </h2>

            <p>
              Your available gift card balance
              can be used on eligible purchases.
            </p>

            <button
              className="amazon-yellow-button"
              onClick={scrollToRedeem}
            >
              Redeem a Gift Card
            </button>

          </div>

          <div className="gift-card-visual">

            <div className="gift-card-logo">
              amazon
            </div>

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

            <h2>
              Redeem a Gift Card
            </h2>

            <p>
              Enter your gift card claim code
              to add the balance to your account.
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
                onChange={(e) =>
                  setGiftCardCode(e.target.value)
                }
                placeholder="Enter your claim code"
                disabled={redeeming}
              />

              <button
                className="amazon-yellow-button"
                onClick={handleRedeem}
                disabled={redeeming}
              >
                {redeeming
                  ? "Redeeming..."
                  : "Redeem"}
              </button>

            </div>

            {message && (
              <div
                className={`gift-message ${messageType}`}
              >
                {message}
              </div>
            )}

            <p className="redeem-help">
              Gift card claim codes are usually
              found on the back of a physical gift
              card or in the delivery email.
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
              <div className="gift-option-icon">
                🎁
              </div>

              <div>
                <h3>Buy a Gift Card</h3>

                <p>
                  Send a gift card to someone
                  by email.
                </p>
              </div>

              <span className="option-arrow">
                ›
              </span>
            </Link>

            <Link
              to="/gift-cards/reload"
              className="gift-option-card"
            >
              <div className="gift-option-icon">
                💳
              </div>

              <div>
                <h3>Reload Your Balance</h3>

                <p>
                  Add money to your existing
                  gift card balance.
                </p>
              </div>

              <span className="option-arrow">
                ›
              </span>
            </Link>

            <Link
              to="/gift-cards/activity"
              className="gift-option-card"
            >
              <div className="gift-option-icon">
                📋
              </div>

              <div>
                <h3>Gift Card Activity</h3>

                <p>
                  View your gift card transactions
                  and activity.
                </p>
              </div>

              <span className="option-arrow">
                ›
              </span>
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

              <div className="empty-icon">
                🎁
              </div>

              <h3>
                You don't have any redeemed
                gift cards yet
              </h3>

              <p>
                When you redeem a gift card,
                your available balance will
                appear here.
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

                <h3>
                  Amazon Gift Card
                </h3>

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

        <section
          className="gift-section about-gift-cards"
        >

          <h2>About Gift Cards</h2>

          <div className="about-grid">

            <div>
              <h3>Easy to use</h3>

              <p>
                Gift cards can be used toward
                eligible purchases on Amazon.
              </p>
            </div>

            <div>
              <h3>No expiration</h3>

              <p>
                Your gift card balance remains
                available for future eligible
                purchases.
              </p>
            </div>

            <div>
              <h3>Give the perfect gift</h3>

              <p>
                Send a gift card to friends
                and family by email.
              </p>
            </div>

          </div>

        </section>

        {/* Bottom Navigation */}

        <div className="gift-bottom-links">

          <Link to="/account">
            Your Account
          </Link>

          <Link to="/orders">
            Your Orders
          </Link>

          <Link to="/lists">
            Your Lists
          </Link>

        </div>

      </div>
    </div>
  );
}

export default GiftCards;