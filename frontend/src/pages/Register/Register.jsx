import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import '../Login/Login.css';

export default function Register() {
  return (
    <div className="auth-container">
      <Link to="/" className="auth-logo-link">
        <img
          className="auth-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon"
        />
      </Link>

      <RegisterForm />

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