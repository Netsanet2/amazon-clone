import { useState } from "react";
import "./TwoStepVerification.css";

export default function TwoStepVerification({ onClose }) {
  const [step, setStep] = useState(1);

  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");

  const [verificationCode, setVerificationCode] = useState("");

  const [enabled, setEnabled] = useState(false);

  // Step 1: Generate a new verification code
  const handleContinue = (e) => {
    e.preventDefault();

    const phoneDigits = phone.replace(/\D/g, "");

    if (phoneDigits.length < 7) {
      alert("Please enter a valid phone number.");
      return;
    }

    // Generate a random 6-digit code
    const newCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Save the generated code
    setVerificationCode(newCode);

    // Frontend demo:
    // Normally the backend would send this code by SMS.
    alert(`Your verification code is: ${newCode}`);

    // Move to verification step
    setStep(2);
  };

  // Step 2: Verify the code
  const handleVerify = (e) => {
    e.preventDefault();

    // Remove spaces and keep only numbers
    const enteredCode = code.replace(/\D/g, "");

    if (enteredCode.length !== 6) {
      alert("Please enter the 6-digit verification code.");
      return;
    }

    // Compare entered code with generated code
    if (enteredCode !== verificationCode) {
      alert("Incorrect verification code. Please try again.");
      return;
    }

    // Correct code
    setEnabled(true);
    setStep(3);
  };

  // Successful verification
  if (enabled) {
    return (
      <div className="two-step-card">
        <div className="two-step-success">
          <div className="success-icon">✓</div>

          <h2>Two-Step Verification is on</h2>

          <p>
            Your account now has an extra layer of security.
          </p>

          <button
            className="two-step-done-button"
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="two-step-card">

      <div className="two-step-header">
        <div>
          <h2>Two-Step Verification</h2>

          <p>
            Add an extra layer of security to your account.
          </p>
        </div>

        <button
          className="two-step-close"
          onClick={onClose}
        >
          ×
        </button>
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <form onSubmit={handleContinue}>

          <div className="two-step-icon">
            🛡️
          </div>

          <h3>Add your phone number</h3>

          <p className="two-step-description">
            We'll use your phone number to verify your
            identity when you sign in.
          </p>

          <div className="two-step-form-group">

            <label>Phone number</label>

            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                const value = e.target.value;

                // Allow numbers and common phone symbols
                const cleanedValue = value.replace(
                  /[^0-9+\-() ]/g,
                  ""
                );

                setPhone(cleanedValue);
              }}
              placeholder="+251 900 000 000"
              required
            />

          </div>

          <button
            type="submit"
            className="two-step-primary-button"
          >
            Continue
          </button>

        </form>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <form onSubmit={handleVerify}>

          <div className="two-step-icon">
            📱
          </div>

          <h3>Enter your verification code</h3>

          <p className="two-step-description">
            We sent a verification code to:
          </p>

          <strong className="verification-phone">
            {phone}
          </strong>

          <div className="two-step-form-group">

            <label>Verification code</label>

            <input
              type="text"
              value={code}
              onChange={(e) => {
                const value = e.target.value;

                // Only allow numbers
                const cleanedValue = value.replace(/\D/g, "");

                setCode(cleanedValue);
              }}
              placeholder="Enter 6-digit code"
              maxLength={6}
              inputMode="numeric"
              required
            />

          </div>

          <p className="demo-code">
            For this frontend demo, your verification code
            was shown in an alert.
          </p>

          <button
            type="submit"
            className="two-step-primary-button"
          >
            Verify
          </button>

          <button
            type="button"
            className="two-step-back-button"
            onClick={() => {
              setStep(1);
              setCode("");
              setVerificationCode("");
            }}
          >
            Back
          </button>

        </form>
      )}

    </div>
  );
}