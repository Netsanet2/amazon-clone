import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password) {
      register(name, email, password);
      navigate('/account');
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
          placeholder="At least 6 characters"
          minLength={6}
          required
        />

        <button type="submit" className="auth-btn-primary">
          Create your Amazon account
        </button>
      </form>

      <p className="auth-legal-text">
        By creating an account, you agree to Amazon's Clone <a href="#">Conditions of Use</a> and <a href="#">Privacy Notice</a>.
      </p>

      <div className="auth-help-link" style={{ marginTop: '22px', borderTop: '1px solid #e7e7e7', paddingTop: '14px' }}>
        Already have an account? <Link to="/login">Sign in</Link>
      </div>
    </div>
  );
}