import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import './Login.css';

export default function Login() {
  return (
    <div className="auth-container">
      <Link to="/" className="auth-logo-link">
        <img
          className="auth-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon"
        />
      </Link>

      <LoginForm />

      <div className="auth-divider">
        <h5>New to Amazon?</h5>
      </div>

      <Link to="/register" className="auth-btn-secondary-link">
        <button className="auth-btn-secondary">Create your Amazon account</button>
      </Link>

      <footer className="auth-footer">
        <div className="auth-footer-links">
          <a href="#">Conditions of Use</a>
          <a href="#">Privacy Notice</a>
          <a href="#">Help</a>
        </div>
        <p>© 1996-2026, Amazon.com, Inc. or its affiliates (Clone)</p>
      </footer>
    </div>
  );
}