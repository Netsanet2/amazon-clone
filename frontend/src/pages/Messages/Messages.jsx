import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Messages.css";

function Messages() {
  const [activeTab, setActiveTab] = useState("All");

  const messages = [];

  const tabs = ["All", "Orders", "Account", "Promotions"];

  const filteredMessages =
    activeTab === "All"
      ? messages
      : messages.filter((message) => message.category === activeTab);

  return (
    <div className="messages-page">
      <div className="messages-container">

        {/* Breadcrumb */}
        <div className="amazon-breadcrumb">
          <Link to="/account">Your Account</Link>
          <span>›</span>
          <span>Messages</span>
        </div>

        {/* Header */}
        <div className="messages-header">
          <div>
            <h1>Messages</h1>
            <p>
              View messages and notifications related to your Amazon account.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="messages-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={
                activeTab === tab
                  ? "message-tab active"
                  : "message-tab"
              }
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Messages */}
        <section className="messages-card">
          {filteredMessages.length === 0 ? (
            <div className="empty-messages">
              <div className="empty-messages-icon">✉️</div>

              <h2>You don't have any messages</h2>

              <p>
                Messages and notifications related to your account
                will appear here.
              </p>

              <Link
                to="/account"
                className="messages-account-button"
              >
                Back to Your Account
              </Link>
            </div>
          ) : (
            <div className="message-list">
              {filteredMessages.map((message) => (
                <div
                  className="message-item"
                  key={message.id}
                >
                  <div className="message-icon">✉️</div>

                  <div className="message-content">
                    <h3>{message.title}</h3>
                    <p>{message.description}</p>
                    <span>{message.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Information */}
        <section className="messages-information">
          <h2>About Messages</h2>

          <div className="messages-info-grid">

            <div>
              <h3>Order updates</h3>
              <p>
                Important notifications about your orders can appear
                in your messages.
              </p>
            </div>

            <div>
              <h3>Account notifications</h3>
              <p>
                Security and account-related notifications can be
                displayed here.
              </p>
            </div>

            <div>
              <h3>Promotions</h3>
              <p>
                Promotional messages and special offers may appear
                in this section.
              </p>
            </div>

          </div>
        </section>

        {/* Bottom Links */}
        <div className="messages-bottom-links">
          <Link to="/account">Your Account</Link>
          <Link to="/orders">Your Orders</Link>
          <Link to="/gift-cards">Gift Cards</Link>
        </div>

      </div>
    </div>
  );
}

export default Messages;