import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './UserProfile.css';

export default function UserProfile() {
  const { user } = useAuth();

  return (
    <div className="amazon-account-header">
      <div className="amazon-avatar-container">
        <svg viewBox="0 0 1024 1024" className="amazon-avatar-icon">
          <path fill="#a6a6a6" d="M512 0C229.23 0 0 229.23 0 512s229.23 512 512 512 512-229.23 512-512S794.77 0 512 0zm0 160c106.04 0 192 85.96 192 192s-85.96 192-192 192-192-85.96-192-192 85.96-192 192-192zm0 704c-132.55 0-250.29-63.71-324.81-162.29C208.67 632.71 346.06 592 512 592s303.33 40.71 324.81 111.71C762.29 800.29 644.55 864 512 864z"/>
        </svg>
      </div>
      <div className="amazon-user-greeting">
        <h1>Your Account</h1>
        <p>Hello, <strong>{user?.name || 'Customer'}</strong> ({user?.email || 'guest@amazon.com'})</p>
      </div>
    </div>
  );
}