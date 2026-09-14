import { useState } from "react";
import { Link } from "react-router-dom";
import "./SubscribeSave.css";

export default function SubscribeSave() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [showManageModal, setShowManageModal] = useState(false);

  const openManage = (subscription) => {
    setSelectedSubscription(subscription);
    setShowManageModal(true);
  };

  const closeManage = () => {
    setSelectedSubscription(null);
    setShowManageModal(false);
  };

  const updateFrequency = (frequency) => {
    setSubscriptions((currentSubscriptions) =>
      currentSubscriptions.map((subscription) =>
        subscription.id === selectedSubscription.id
          ? {
              ...subscription,
              frequency,
            }
          : subscription
      )
    );

    setSelectedSubscription((currentSubscription) => ({
      ...currentSubscription,
      frequency,
    }));
  };

  const updateQuantity = (quantity) => {
    const newQuantity = Number(quantity);

    setSubscriptions((currentSubscriptions) =>
      currentSubscriptions.map((subscription) =>
        subscription.id === selectedSubscription.id
          ? {
              ...subscription,
              quantity: newQuantity,
            }
          : subscription
      )
    );

    setSelectedSubscription((currentSubscription) => ({
      ...currentSubscription,
      quantity: newQuantity,
    }));
  };

  const skipNextDelivery = () => {
    setSubscriptions((currentSubscriptions) =>
      currentSubscriptions.map((subscription) =>
        subscription.id === selectedSubscription.id
          ? {
              ...subscription,
              skipped: true,
            }
          : subscription
      )
    );

    setSelectedSubscription((currentSubscription) => ({
      ...currentSubscription,
      skipped: true,
    }));
  };

  const resumeDelivery = () => {
    setSubscriptions((currentSubscriptions) =>
      currentSubscriptions.map((subscription) =>
        subscription.id === selectedSubscription.id
          ? {
              ...subscription,
              skipped: false,
            }
          : subscription
      )
    );

    setSelectedSubscription((currentSubscription) => ({
      ...currentSubscription,
      skipped: false,
    }));
  };

  const cancelSubscription = () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this subscription?"
    );

    if (!confirmed) {
      return;
    }

    setSubscriptions((currentSubscriptions) =>
      currentSubscriptions.filter(
        (subscription) =>
          subscription.id !== selectedSubscription.id
      )
    );

    closeManage();
  };

  return (
    <div className="subscribe-save-page">
      <div className="container">
        <div className="amazon-breadcrumb">
          <Link to="/account">Your Account</Link>
          <span>›</span>
          <span>Subscribe &amp; Save</span>
        </div>

        <div className="subscribe-save-header">
          <div>
            <h1>Subscribe &amp; Save</h1>

            <p>
              Manage your recurring deliveries and save time
              on products you regularly use.
            </p>
          </div>
        </div>

        <section className="subscribe-save-intro">
          <div className="intro-content">
            <span className="intro-icon">↻</span>

            <div>
              <h2>Never run out of everyday essentials</h2>

              <p>
                Set up automatic deliveries for eligible
                products and choose how often you want them
                delivered.
              </p>

              <Link
                to="/"
                className="shop-subscribe-button"
              >
                Shop eligible products
              </Link>
            </div>
          </div>
        </section>

        <section className="subscriptions-section">
          <div className="section-heading">
            <div>
              <h2>Your subscriptions</h2>

              <p>
                Manage your recurring product deliveries.
              </p>
            </div>

            <span className="subscription-count">
              {subscriptions.length}{" "}
              {subscriptions.length === 1
                ? "subscription"
                : "subscriptions"}
            </span>
          </div>

          {subscriptions.length === 0 ? (
            <div className="empty-subscriptions">
              <div className="empty-icon">↻</div>

              <h2>You don't have any subscriptions</h2>

              <p>
                Subscribe to eligible products you use
                regularly and choose your delivery schedule.
              </p>

              <Link
                to="/"
                className="empty-shop-button"
              >
                Find products to subscribe to
              </Link>
            </div>
          ) : (
            <div className="subscription-list">
              {subscriptions.map((subscription) => (
                <article
                  className="subscription-card"
                  key={subscription.id}
                >
                  <div className="subscription-product">
                    <div className="product-placeholder">
                      {subscription.image ? (
                        <img
                          src={subscription.image}
                          alt={subscription.name}
                        />
                      ) : (
                        "📦"
                      )}
                    </div>

                    <div>
                      <h3>{subscription.name}</h3>

                      <p className="subscription-price">
                        ${subscription.price.toFixed(2)}
                      </p>

                      <p>
                        Quantity: {subscription.quantity}
                      </p>

                      <p>
                        Delivery every{" "}
                        {subscription.frequency}
                      </p>
                    </div>
                  </div>

                  <div className="subscription-details">
                    <div>
                      <span className="detail-label">
                        Next delivery
                      </span>

                      <strong>
                        {subscription.nextDelivery}
                      </strong>
                    </div>

                    <div>
                      <span className="detail-label">
                        Status
                      </span>

                      <strong
                        className={
                          subscription.skipped
                            ? "status-skipped"
                            : "status-active"
                        }
                      >
                        {subscription.skipped
                          ? "Next delivery skipped"
                          : "Active"}
                      </strong>
                    </div>
                  </div>

                  <button
                    className="manage-subscription-button"
                    onClick={() => openManage(subscription)}
                  >
                    Manage subscription
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="how-it-works">
          <h2>How Subscribe &amp; Save works</h2>

          <div className="steps-grid">
            <div className="save-step">
              <span>1</span>
              <h3>Choose an eligible product</h3>
              <p>
                Find products that offer Subscribe &amp; Save.
              </p>
            </div>

            <div className="save-step">
              <span>2</span>
              <h3>Choose your schedule</h3>
              <p>
                Select the quantity and how often you want
                the product delivered.
              </p>
            </div>

            <div className="save-step">
              <span>3</span>
              <h3>Manage anytime</h3>
              <p>
                Change your schedule, skip a delivery, or
                cancel your subscription.
              </p>
            </div>
          </div>
        </section>

        <section className="subscribe-help">
          <h2>Need help?</h2>

          <p>
            You can manage your payment methods and addresses
            from your account.
          </p>

          <div className="help-links">
            <Link to="/payment-methods">
              Manage payment methods
            </Link>

            <Link to="/addresses">
              Manage addresses
            </Link>

            <Link to="/account">
              Back to Your Account
            </Link>
          </div>
        </section>
      </div>

      {showManageModal && selectedSubscription && (
        <div className="manage-modal-overlay">
          <div className="manage-modal">
            <div className="manage-modal-header">
              <div>
                <p>Manage subscription</p>
                <h2>{selectedSubscription.name}</h2>
              </div>

              <button
                className="close-manage-button"
                onClick={closeManage}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="manage-modal-content">
              <div className="manage-row">
                <div>
                  <strong>Delivery frequency</strong>
                  <p>
                    Choose how often you receive this item.
                  </p>
                </div>

                <select
                  value={selectedSubscription.frequency}
                  onChange={(event) =>
                    updateFrequency(event.target.value)
                  }
                >
                  <option value="1 month">Every month</option>
                  <option value="2 months">
                    Every 2 months
                  </option>
                  <option value="3 months">
                    Every 3 months
                  </option>
                  <option value="6 months">
                    Every 6 months
                  </option>
                </select>
              </div>

              <div className="manage-row">
                <div>
                  <strong>Quantity</strong>
                  <p>
                    Choose how many items you receive each
                    delivery.
                  </p>
                </div>

                <select
                  value={selectedSubscription.quantity}
                  onChange={(event) =>
                    updateQuantity(event.target.value)
                  }
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>

              <div className="manage-row">
                <div>
                  <strong>Next delivery</strong>
                  <p>
                    {selectedSubscription.nextDelivery}
                  </p>
                </div>
              </div>

              <div className="manage-actions">
                {selectedSubscription.skipped ? (
                  <button
                    className="manage-secondary-button"
                    onClick={resumeDelivery}
                  >
                    Resume next delivery
                  </button>
                ) : (
                  <button
                    className="manage-secondary-button"
                    onClick={skipNextDelivery}
                  >
                    Skip next delivery
                  </button>
                )}

                <button
                  className="cancel-subscription-button"
                  onClick={cancelSubscription}
                >
                  Cancel subscription
                </button>
              </div>

              <div className="manage-footer">
                <button
                  className="close-manage-footer-button"
                  onClick={closeManage}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}