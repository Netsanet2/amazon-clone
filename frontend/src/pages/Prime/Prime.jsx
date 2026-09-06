import { useState } from "react";
import { Link } from "react-router-dom";
import "./Prime.css";

function Prime() {
  const [isPrime, setIsPrime] = useState(false);
  const [step, setStep] = useState("plans");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [billingAddress, setBillingAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  const [addressError, setAddressError] = useState("");

  const plans = [
    {
      id: "monthly",
      name: "Prime Monthly",
      price: "$14.99",
      period: "/month",
      description: "Pay monthly and cancel anytime.",
    },
    {
      id: "yearly",
      name: "Prime Annual",
      price: "$139",
      period: "/year",
      description: "Pay annually and save compared with monthly billing.",
    },
  ];

  const paymentMethods = [
    {
      id: "visa",
      type: "Visa",
      last4: "1111",
    },
    {
      id: "mastercard",
      type: "Mastercard",
      last4: "2222",
    },
  ];

  const selectedPlanData = plans.find(
    (plan) => plan.id === selectedPlan
  );

  const selectedPaymentData = paymentMethods.find(
    (payment) => payment.id === selectedPayment
  );

  const openJoinFlow = () => {
    setStep("plans");
    setShowModal(true);
    setAddressError("");
  };

  const continueToPayment = () => {
    if (!selectedPlan) {
      alert("Please select a Prime membership plan.");
      return;
    }

    setStep("payment");
  };

  const continueToBilling = () => {
    if (!selectedPayment) {
      alert("Please select a payment method.");
      return;
    }

    setStep("billing");
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;

    setBillingAddress((previousAddress) => ({
      ...previousAddress,
      [name]: value,
    }));

    setAddressError("");
  };

  const continueToReview = () => {
    const {
      fullName,
      address,
      city,
      state,
      zipCode,
      country,
    } = billingAddress;

    if (
      !fullName.trim() ||
      !address.trim() ||
      !city.trim() ||
      !state.trim() ||
      !zipCode.trim() ||
      !country.trim()
    ) {
      setAddressError("Please enter your complete billing address.");
      return;
    }

    setStep("review");
  };

  const confirmMembership = () => {
    setIsPrime(true);
    setShowModal(false);
    setStep("plans");
  };

  const cancelMembership = () => {
    setShowModal(false);
    setStep("plans");
    setAddressError("");
  };

  return (
    <div className="prime-page">
      <div className="container">
        <div className="amazon-breadcrumb">
          <Link to="/account">Your Account</Link>
          <span>›</span>
          <span>Prime Membership</span>
        </div>

        <section className="prime-hero">
          <div className="prime-hero-content">
            <p className="prime-label">AMAZON PRIME</p>

            <h1>
              {isPrime
                ? "Your Prime membership"
                : "Join Amazon Prime"}
            </h1>

            <p className="prime-hero-text">
              Get fast, free delivery and enjoy entertainment,
              exclusive deals, and more with Prime.
            </p>

            {!isPrime ? (
              <button
                className="prime-main-button"
                onClick={openJoinFlow}
              >
                Start Prime membership
              </button>
            ) : (
              <div className="prime-active-message">
                <strong>Your Prime membership is active.</strong>
                <p>
                  You can enjoy your Prime benefits while your
                  membership remains active.
                </p>
              </div>
            )}
          </div>
        </section>

        {isPrime && (
          <section className="membership-card">
            <div>
              <p className="section-label">MEMBERSHIP</p>
              <h2>Amazon Prime</h2>

              <p>
                Plan:{" "}
                <strong>
                  {selectedPlanData?.name || "Prime Membership"}
                </strong>
              </p>

              <p>
                Payment:{" "}
                <strong>
                  {selectedPaymentData
                    ? `${selectedPaymentData.type} ending in ${selectedPaymentData.last4}`
                    : "Saved payment method"}
                </strong>
              </p>

              <p>
                Billing address:{" "}
                <strong>
                  {billingAddress.city
                    ? `${billingAddress.city}, ${billingAddress.state}`
                    : "Saved billing address"}
                </strong>
              </p>
            </div>

            <div className="membership-status">
  <span>Active</span>

  <button
    className="manage-membership-button"
    onClick={() => setShowModal(true)}
  >
    Manage membership
  </button>
</div>
          </section>
        )}

        <section className="prime-benefits">
          <h2>Prime benefits</h2>

          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🚚</div>
              <h3>Fast, free delivery</h3>
              <p>
                Get fast delivery on millions of eligible
                products.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">▶</div>
              <h3>Prime Video</h3>
              <p>
                Watch movies, shows, and Amazon Originals
                included with Prime.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">♫</div>
              <h3>Amazon Music</h3>
              <p>
                Listen to a large selection of music and
                podcasts.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">★</div>
              <h3>Exclusive deals</h3>
              <p>
                Get access to special offers and member-only
                savings.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">📚</div>
              <h3>Prime Reading</h3>
              <p>
                Read a selection of books, magazines, and
                comics included with Prime.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🎮</div>
              <h3>Prime Gaming</h3>
              <p>
                Enjoy gaming benefits, free games, and
                additional content.
              </p>
            </div>
          </div>
        </section>

        <section className="prime-about">
          <h2>About Prime</h2>

          <p>
            Amazon Prime brings together delivery, shopping,
            entertainment, and other membership benefits in one
            subscription.
          </p>

          <p>
            Choose the membership plan that works best for you
            and manage your membership from your Amazon account.
          </p>
        </section>
      </div>

      {showModal && (
        <div className="prime-modal-overlay">
          <div className="prime-modal">
            <div className="modal-header">
              <h2>
                {step === "plans" && "Choose your Prime plan"}
                {step === "payment" && "Choose a payment method"}
                {step === "billing" && "Enter your billing address"}
                {step === "review" && "Review your membership"}
              </h2>

              <button
                className="close-modal"
                onClick={cancelMembership}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="prime-steps">
              <div
                className={
                  step === "plans"
                    ? "prime-step active"
                    : "prime-step"
                }
              >
                1. Plan
              </div>

              <div
                className={
                  step === "payment"
                    ? "prime-step active"
                    : "prime-step"
                }
              >
                2. Payment
              </div>

              <div
                className={
                  step === "billing"
                    ? "prime-step active"
                    : "prime-step"
                }
              >
                3. Address
              </div>

              <div
                className={
                  step === "review"
                    ? "prime-step active"
                    : "prime-step"
                }
              >
                4. Review
              </div>
            </div>

            {step === "plans" && (
              <div className="modal-content">
                <p className="modal-description">
                  Select the Prime membership plan you want.
                </p>

                <div className="plan-list">
                  {plans.map((plan) => (
                    <label
                      key={plan.id}
                      className={
                        selectedPlan === plan.id
                          ? "plan-option selected"
                          : "plan-option"
                      }
                    >
                      <input
                        type="radio"
                        name="prime-plan"
                        value={plan.id}
                        checked={selectedPlan === plan.id}
                        onChange={(event) =>
                          setSelectedPlan(event.target.value)
                        }
                      />

                      <div className="plan-details">
                        <strong>{plan.name}</strong>

                        <div className="plan-price">
                          {plan.price}
                          <span>{plan.period}</span>
                        </div>

                        <p>{plan.description}</p>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="modal-actions">
                  <button
                    className="secondary-button"
                    onClick={cancelMembership}
                  >
                    Cancel
                  </button>

                  <button
                    className="amazon-button"
                    onClick={continueToPayment}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === "payment" && (
              <div className="modal-content">
                <p className="modal-description">
                  Select the payment method you want to use
                  for your Prime membership.
                </p>

                <div className="payment-list">
                  {paymentMethods.map((payment) => (
                    <label
                      key={payment.id}
                      className={
                        selectedPayment === payment.id
                          ? "payment-option selected"
                          : "payment-option"
                      }
                    >
                      <input
                        type="radio"
                        name="payment-method"
                        value={payment.id}
                        checked={selectedPayment === payment.id}
                        onChange={(event) =>
                          setSelectedPayment(event.target.value)
                        }
                      />

                      <div>
                        <strong>{payment.type}</strong>

                        <p>
                          ending in {payment.last4}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>

                <Link
  to="/payment-methods"
  className="add-payment-button"
>
  + Add a payment method
</Link>

                <div className="modal-actions">
                  <button
                    className="secondary-button"
                    onClick={() => setStep("plans")}
                  >
                    Back
                  </button>

                  <button
                    className="amazon-button"
                    onClick={continueToBilling}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === "billing" && (
              <div className="modal-content">
                <p className="modal-description">
                  Enter the billing address associated with
                  your payment method.
                </p>

                <div className="billing-form">
                  <label>
                    Full name
                    <input
                      type="text"
                      name="fullName"
                      value={billingAddress.fullName}
                      onChange={handleAddressChange}
                    />
                  </label>

                  <label>
                    Address
                    <input
                      type="text"
                      name="address"
                      value={billingAddress.address}
                      onChange={handleAddressChange}
                    />
                  </label>

                  <div className="billing-row">
                    <label>
                      City
                      <input
                        type="text"
                        name="city"
                        value={billingAddress.city}
                        onChange={handleAddressChange}
                      />
                    </label>

                    <label>
                      State
                      <input
                        type="text"
                        name="state"
                        value={billingAddress.state}
                        onChange={handleAddressChange}
                      />
                    </label>
                  </div>

                  <div className="billing-row">
                    <label>
                      ZIP code
                      <input
                        type="text"
                        name="zipCode"
                        value={billingAddress.zipCode}
                        onChange={handleAddressChange}
                      />
                    </label>

                    <label>
                      Country
                      <input
                        type="text"
                        name="country"
                        value={billingAddress.country}
                        onChange={handleAddressChange}
                      />
                    </label>
                  </div>

                  {addressError && (
                    <p className="form-error">{addressError}</p>
                  )}
                </div>

                <div className="modal-actions">
                  <button
                    className="secondary-button"
                    onClick={() => setStep("payment")}
                  >
                    Back
                  </button>

                  <button
                    className="amazon-button"
                    onClick={continueToReview}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === "review" && (
              <div className="modal-content">
                <p className="modal-description">
                  Review your membership details before
                  confirming.
                </p>

                <div className="review-section">
                  <h3>Membership plan</h3>

                  <div className="review-line">
                    <span>{selectedPlanData?.name}</span>

                    <strong>
                      {selectedPlanData?.price}
                      {selectedPlanData?.period}
                    </strong>
                  </div>
                </div>

                <div className="review-section">
                  <h3>Payment method</h3>

                  <p>
                    {selectedPaymentData?.type} ending in{" "}
                    {selectedPaymentData?.last4}
                  </p>
                </div>

                <div className="review-section">
                  <h3>Billing address</h3>

                  <p>{billingAddress.fullName}</p>
                  <p>{billingAddress.address}</p>
                  <p>
                    {billingAddress.city},{" "}
                    {billingAddress.state}{" "}
                    {billingAddress.zipCode}
                  </p>
                  <p>{billingAddress.country}</p>
                </div>

                <div className="review-total">
                  <span>Membership price</span>

                  <strong>
                    {selectedPlanData?.price}
                    {selectedPlanData?.period}
                  </strong>
                </div>

                <div className="modal-actions">
                  <button
                    className="secondary-button"
                    onClick={() => setStep("billing")}
                  >
                    Back
                  </button>

                  <button
                    className="amazon-button"
                    onClick={confirmMembership}
                  >
                    Confirm membership
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Prime;