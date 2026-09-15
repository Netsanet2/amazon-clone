import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Login/Login.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="auth-container">
      <Link to="/">
        <img
          className="auth-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon"
        />
      </Link>

      <div className="auth-card">
        <h1 className="auth-title">Password assistance</h1>
        <p style={{ fontSize: '13px', marginBottom: '14px', lineHeight: '1.4' }}>
          Enter the email address associated with your Amazon account.
        </p>

        {submitted ? (
          <div style={{ fontSize: '13px', color: '#007600' }}>
            A password reset link has been sent to <strong>{email}</strong>.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label className="auth-label" htmlFor="reset-email">Email</label>
            <input
              id="reset-email"
              type="email"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="auth-btn-primary">
              Continue
            </button>
          </form>
        )}
      </div>
    </div>
  );
}