import React from "react";
import { Link } from "react-router-dom";
import "./ArchivedOrders.css";

function ArchivedOrders() {
  return (
    <div className="archived-orders-page">
      <div className="archived-orders-container">

        {/* Breadcrumb */}
        <div className="amazon-breadcrumb">
          <Link to="/account">Your Account</Link>
          <span>›</span>
          <span>Archived Orders</span>
        </div>

        {/* Header */}
        <div className="archived-orders-header">
          <h1>Archived Orders</h1>
          <p>
            View orders that you have archived from your order history.
          </p>
        </div>

        {/* Empty State */}
        <section className="archived-orders-card">
          <div className="archived-orders-icon">📦</div>

          <h2>You don't have any archived orders</h2>

          <p>
            When you archive an order, it will appear here.
          </p>

          <Link
            to="/orders"
            className="view-orders-button"
          >
            View Your Orders
          </Link>
        </section>

        {/* Information */}
        <section className="archived-orders-information">
          <h2>About Archived Orders</h2>

          <div className="archived-info-grid">

            <div>
              <h3>Keep your order history organized</h3>
              <p>
                Archiving an order removes it from your default order
                history view without deleting the order.
              </p>
            </div>

            <div>
              <h3>Find archived orders here</h3>
              <p>
                Orders that you archive can be viewed again from this
                page.
              </p>
            </div>

            <div>
              <h3>Orders are not deleted</h3>
              <p>
                Archiving an order does not remove the order from your
                account.
              </p>
            </div>

          </div>
        </section>

        {/* Bottom Links */}
        <div className="archived-orders-bottom-links">
          <Link to="/account">Your Account</Link>
          <Link to="/orders">Your Orders</Link>
          <Link to="/lists">Your Lists</Link>
        </div>

      </div>
    </div>
  );
}

export default ArchivedOrders;