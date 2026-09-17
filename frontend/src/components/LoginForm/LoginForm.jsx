import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { isValidEmail, isValidPassword, validationMessages } from '../../utils/validation';
import './LoginForm.css';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from;
  const destination = from?.pathname
    ? `${from.pathname}${from.search || ''}${from.hash || ''}`
    : '/account';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError(validationMessages.email);
      return;
    }
    if (!isValidPassword(password)) {
      setError(validationMessages.password);
      return;
    }
    if (email && password) {
      login(email, password);
      navigate(destination, { replace: true, state: from?.state });
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

        <button type="submit" className="auth-btn-primary">
          Sign in
        </button>
      </form>

      {error && <p className="field-error" role="alert">{error}</p>}

      <p className="auth-legal-text">
        By continuing, you agree to Amazon's Clone <a href="#">Conditions of Use</a> and <a href="#">Privacy Notice</a>.
      </p>

      <div className="auth-help-link">
        <Link to="/forgot-password" state={location.state}>Forgot your password?</Link>
      </div>
    </div>
  );
}