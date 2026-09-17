import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { isValidEmail, isValidPassword, validationMessages } from '../../utils/validation';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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
    if (name && email && password) {
      register(name, email, password);
      const from = location.state?.from;
      const destination = from?.pathname
        ? `${from.pathname}${from.search || ''}${from.hash || ''}`
        : '/account';
      navigate(destination, { replace: true, state: from?.state });
    }
  };

  return (
    <div className="auth-card">
      <h1 className="auth-title">Create account</h1>

      <form onSubmit={handleSubmit}>
        <label className="auth-label" htmlFor="register-name">
          Your name
        </label>
        <input
          id="register-name"
          type="text"
          className="auth-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="First and last name"
          required
        />

        <label className="auth-label" htmlFor="register-email">
          Mobile number or email
        </label>
        <input
          id="register-email"
          type="email"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="auth-label" htmlFor="register-password">
          Password
        </label>
        <input
          id="register-password"
          type="password"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 7 characters"
          minLength={7}
          required
        />

        <button type="submit" className="auth-btn-primary">
          Create your Amazon account
        </button>
      </form>

      {error && <p className="field-error" role="alert">{error}</p>}

      <p className="auth-legal-text">
        By creating an account, you agree to Amazon's Clone <a href="#">Conditions of Use</a> and <a href="#">Privacy Notice</a>.
      </p>

      <div className="auth-help-link" style={{ marginTop: '22px', borderTop: '1px solid #e7e7e7', paddingTop: '14px' }}>
        Already have an account? <Link to="/login" state={location.state}>Sign in</Link>
      </div>
    </div>
  );
}