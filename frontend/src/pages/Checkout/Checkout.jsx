import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { createOrder } from '../../services/orderService';
import {
  isValidPhone,
  sanitizePhone,
  validationMessages,
} from '../../utils/validation';
import './Checkout.css';

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { cartItems, clearCart } = useCart();

  const isBuyNowCheckout = location.state?.buyNow === true;

  const buyNowItem = isBuyNowCheckout
    ? JSON.parse(localStorage.getItem('buyNow') || 'null')
    : null;

  const checkoutItems = buyNowItem ? [buyNowItem] : cartItems;

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    country: 'Ethiopia',
    region: '',
    city: '',
    address: '',
    postalCode: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({});

  const subtotal = checkoutItems.reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.quantity),
    0
  );

  const shipping = subtotal === 0 || subtotal >= 50 ? 0 : 5;
  const savings = subtotal * 0.1;
  const total = subtotal + shipping - savings;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]:
        name === 'phone'
          ? sanitizePhone(value)
          : value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: '',
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate('/login', {
        state: { from: location },
        replace: true,
      });
      return;
    }

    const requiredFields = [
      'fullName',
      'phone',
      'country',
      'region',
      'city',
      'address',
      'cardNumber',
      'expiry',
      'cvv',
    ];

    const validationErrors = requiredFields.reduce(
      (fieldErrors, field) => {
        if (!formData[field].trim()) {
          fieldErrors[field] = 'This field is required.';
        }

        return fieldErrors;
      },
      {}
    );

    if (checkoutItems.length === 0) {
      validationErrors.cart = 'Your cart is empty.';
    }

    if (
      formData.phone.trim() &&
      !isValidPhone(formData.phone)
    ) {
      validationErrors.phone = validationMessages.phone;
    }

    if (
      formData.postalCode.trim() &&
      !/^[A-Za-z0-9\s-]{3,10}$/.test(
        formData.postalCode.trim()
      )
    ) {
      validationErrors.postalCode =
        'Enter a valid postal code.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const order = {
      userId: user.uid,

      customer: {
        name: formData.fullName.trim(),
        email: user?.email || '',
      },

      shippingAddress: {
        name: formData.fullName,
        phone: formData.phone,
        country: formData.country,
        region: formData.region,
        city: formData.city,
        address: formData.address,
        postalCode: formData.postalCode,
      },

      paymentMethod: `Card ending in ${formData.cardNumber.slice(-4)}`,

      items: checkoutItems.map((item) => ({
        ...item,
        title: item.title || item.name,
        quantity: Number(item.quantity),
      })),

      summary: {
        itemsSubtotal: subtotal,
        shipping,
        savings,
        total,
      },
    };

    try {
      await createOrder(order);

      if (isBuyNowCheckout) {
        localStorage.removeItem('buyNow');
      } else {
        clearCart();
      }

      navigate('/confirmation');
    } catch (error) {
      console.error('Failed to place order:', error);

      setErrors({
        firebase:
          'Unable to place your order. Please try again.',
      });
    }
  };

  const fieldError = (field) =>
    errors[field] && (
      <span className="field-error">
        {errors[field]}
      </span>
    );

  return (
    <div className="checkout-container">
      <form
        className="checkout-wrapper"
        onSubmit={handlePlaceOrder}
      >
        <h1 className="checkout-heading">
          Checkout
        </h1>

        <div className="checkout-grid">
          {/* Main Left Section */}
          <div className="checkout-left">

            {/* 1. Shipping Address */}
            <div className="checkout-card">
              <h2>1. Shipping Address</h2>

              <div className="form-group">
                <label htmlFor="checkout-full-name">
                  Full Name
                </label>

                <input
                  id="checkout-full-name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                />

                {fieldError('fullName')}
              </div>

              <div className="form-group">
                <label htmlFor="checkout-phone">
                  Phone Number
                </label>

                <input
                  id="checkout-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  inputMode="tel"
                  placeholder="Enter your phone number"
                  autoComplete="tel"
                />

                {fieldError('phone')}
              </div>

              <div className="form-group">
                <label htmlFor="checkout-country">
                  Country
                </label>

                <select
                  id="checkout-country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  autoComplete="country-name"
                >
                  <option value="" disabled>
                    Select your country
                  </option>

                  <option value="Ethiopia">
                    Ethiopia
                  </option>

                  <option value="United States">
                    United States
                  </option>

                  <option value="Canada">
                    Canada
                  </option>

                  <option value="United Kingdom">
                    United Kingdom
                  </option>
                </select>

                {fieldError('country')}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="checkout-region">
                    Region / State
                  </label>

                  <input
                    id="checkout-region"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter your region or state"
                    autoComplete="address-level1"
                  />

                  {fieldError('region')}
                </div>

                <div className="form-group">
                  <label htmlFor="checkout-city">
                    City
                  </label>

                  <input
                    id="checkout-city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter your city"
                    autoComplete="address-level2"
                  />

                  {fieldError('city')}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="checkout-address">
                  Street Address
                </label>

                <input
                  id="checkout-address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter your street address"
                  autoComplete="street-address"
                />

                {fieldError('address')}
              </div>

              <div className="form-group">
                <label htmlFor="checkout-postal-code">
                  Postal Code{' '}
                  <span className="optional-label">
                    (if applicable)
                  </span>
                </label>

                <input
                  id="checkout-postal-code"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter your postal code"
                  autoComplete="postal-code"
                />

                {fieldError('postalCode')}
              </div>
            </div>

            {/* 2. Payment Method */}
            <div className="checkout-card">
              <h2>2. Payment Method</h2>

              <div className="payment-options">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="payment"
                    defaultChecked
                  />
                  Credit or Debit Card
                </label>

                <div className="card-inputs">
                  <div className="form-group">
                    <label>Card Number</label>

                    <input
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      type="text"
                      placeholder="4532 •••• •••• 8921"
                    />

                    {fieldError('cardNumber')}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>
                        Expiration Date
                      </label>

                      <input
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleChange}
                        type="text"
                        placeholder="MM/YY"
                      />

                      {fieldError('expiry')}
                    </div>

                    <div className="form-group">
                      <label>CVV</label>

                      <input
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        type="password"
                        placeholder="123"
                      />

                      {fieldError('cvv')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Summary Sidebar */}
          <div className="checkout-right">
            <div className="checkout-card summary-card">
              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Items:</span>
                <span>
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="summary-row">
                <span>Shipping & handling:</span>
                <span>
                  ${shipping.toFixed(2)}
                </span>
              </div>

              <div className="summary-row savings">
                <span>Promotion Applied:</span>
                <span>
                  -${savings.toFixed(2)}
                </span>
              </div>

              <hr />

              <div className="summary-row total-row">
                <strong>Order Total:</strong>
                <strong>
                  ${total.toFixed(2)}
                </strong>
              </div>

              {errors.cart && (
                <p className="field-error">
                  {errors.cart}
                </p>
              )}

              {errors.firebase && (
                <p className="field-error">
                  {errors.firebase}
                </p>
              )}

              <button
                type="submit"
                className="place-order-btn"
              >
                Place Your Order
              </button>

              <p className="secure-notice">
                🔒 Secure checkout • Your payment
                information is protected
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
