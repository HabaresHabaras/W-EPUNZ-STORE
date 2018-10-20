import React from 'react';
import { Link } from 'react-router-dom';

const OrderConfirmation = () => (
  <main role="main" id="container" className="main-container push">
    <section className="order-confirmation">
      <div className="content">
        <div className="confirmation">
          <h2>All done, your order was placed!</h2>
          <p>You'll get a confirmation in your email</p>
          <Link to="/products" className="btn">
          Continue Browsing
        </Link>
        </div>
      </div>
    </section>
  </main>
);

export default OrderConfirmation;
