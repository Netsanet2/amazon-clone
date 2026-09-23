import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  getUserGiftCardBalance,
  getUserGiftCardActivity,
} from "../../services/userService";
import "./GiftCardActivity.css";

function GiftCardActivity() {
  const { user } = useAuth();

  const [balance, setBalance] = useState(0);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGiftCardActivity = async () => {
      if (!user?.uid) {
        setBalance(0);
        setActivities([]);
        setLoading(false);
        return;
      }

      try {
        const savedBalance = await getUserGiftCardBalance(
          user.uid
        );

        const savedActivity = await getUserGiftCardActivity(
          user.uid
        );

        setBalance(savedBalance);
        setActivities(savedActivity);
      } catch (error) {
        console.error(
          "Error loading gift card activity:",
          error
        );

        alert(
          "Unable to load your gift card activity."
        );
      } finally {
        setLoading(false);
      }
    };

    loadGiftCardActivity();
  }, [user?.uid]);

  if (loading) {
    return (
      <div className="gift-activity-page">
        <div className="gift-activity-container">
          <p>Loading your gift card activity...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="gift-activity-page">
      <div className="gift-activity-container">

        {/* Breadcrumb */}
        <div className="amazon-breadcrumb">
          <Link to="/account">Your Account</Link>
          <span>›</span>
          <Link to="/gift-cards">Gift Cards</Link>
          <span>›</span>
          <span>Gift Card Activity</span>
        </div>

        {/* Header */}
        <div className="gift-activity-header">
          <h1>Gift Card Activity</h1>

          <p>
            View your gift card redemptions, purchases,
            and balance activity.
          </p>
        </div>

        {/* Balance */}
        <section className="activity-balance-card">
          <div>
            <span className="activity-balance-label">
              Current Gift Card Balance
            </span>

            <strong>
              ${Number(balance).toFixed(2)}
            </strong>
          </div>

          <Link
            to="/gift-cards/reload"
            className="activity-reload-button"
          >
            Reload Your Balance
          </Link>
        </section>

        {/* Activity */}
        <section className="activity-section">
          <div className="activity-section-heading">
            <h2>Recent Activity</h2>

            <p>
              Your recent gift card transactions are
              shown below.
            </p>
          </div>

          <div className="activity-card">

            {activities.length === 0 ? (
              <div className="no-activity">
                <div className="no-activity-icon">
                  📋
                </div>

                <h3>No gift card activity yet</h3>

                <p>
                  When you redeem, purchase, or reload a
                  gift card, your activity will appear here.
                </p>
              </div>
            ) : (
              <div className="activity-list">
                {activities.map((activity, index) => (
                  <div
                    className="activity-row"
                    key={activity.id || index}
                  >

                    <div className="activity-icon">
                      {activity.type === "credit"
                        ? "＋"
                        : "−"}
                    </div>

                    <div className="activity-details">
                      <h3>
                        {activity.description}
                      </h3>

                      <p>
                        {activity.date}
                      </p>
                    </div>

                    <strong
                      className={
                        activity.type === "credit"
                          ? "activity-amount credit"
                          : "activity-amount debit"
                      }
                    >
                      {activity.type === "credit"
                        ? "+"
                        : "-"}
                      ${Number(activity.amount).toFixed(2)}
                    </strong>

                  </div>
                ))}
              </div>
            )}

          </div>
        </section>

        {/* Information */}
        <section className="activity-information">
          <h2>About Gift Card Activity</h2>

          <div className="activity-info-grid">

            <div>
              <h3>Redemptions</h3>

              <p>
                Gift cards that you redeem are added to
                your available gift card balance.
              </p>
            </div>

            <div>
              <h3>Reloads</h3>

              <p>
                Reloading your balance adds additional
                funds to your gift card balance.
              </p>
            </div>

            <div>
              <h3>Purchases</h3>

              <p>
                Gift card purchases and other gift card
                transactions can appear in your activity
                history.
              </p>
            </div>

          </div>
        </section>

        {/* Bottom links */}
        <div className="gift-activity-bottom-links">
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

export default GiftCardActivity;