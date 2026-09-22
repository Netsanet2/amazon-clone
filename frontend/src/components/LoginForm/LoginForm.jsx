import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  isValidEmail,
  isValidPassword,
  validationMessages,
} from "../../utils/validation";

import "./LoginForm.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from;

  const destination = from?.pathname
    ? `${from.pathname}${from.search || ""}${from.hash || ""}`
    : "/account";

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Check email format
    if (!isValidEmail(email)) {
      setError(validationMessages.email);
      return;
    }

    // Check password format
    if (!isValidPassword(password)) {
      setError(validationMessages.password);
      return;
    }

    try {
      setLoading(true);

      // Login through Firebase
      await login(email, password);

      // Login successful
      navigate(destination, {
        replace: true,
        state: from?.state,
      });
    } catch (error) {
      console.error("Login error:", error);

      // Firebase error messages
      if (error.code === "auth/invalid-credential") {
        setError("Incorrect email or password.");
      } else if (error.code === "auth/user-not-found") {
        setError("No account was found with this email.");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else if (error.code === "auth/too-many-requests") {
        setError(
          "Too many unsuccessful attempts. Please try again later."
        );
      } else {
        setError("Unable to sign in. Please check your information and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h1 className="auth-title">Sign in</h1>

      <form onSubmit={handleSubmit}>
        <label className="auth-label" htmlFor="login-email">
          Email or mobile phone number
        </label>

        <input
          id="login-email"
          type="email"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="auth-label" htmlFor="login-password">
          Password
        </label>

        <input
          id="login-password"
          type="password"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={7}
          required
        />

        <button
          type="submit"
          className="auth-btn-primary"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}

      <p className="auth-legal-text">
        By continuing, you agree to Amazon's Clone{" "}
        <a href="#">Conditions of Use</a> and{" "}
        <a href="#">Privacy Notice</a>.
      </p>

      <div className="auth-help-link">
        <Link to="/forgot-password" state={location.state}>
          Forgot your password?
        </Link>
      </div>
    </div>
  );
}