import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import Rating from "../Rating/Rating";
import QuantitySelector from "../QuantitySelector/QuantitySelector";
import AddToCart from "../AddToCart/AddToCart";
import BuyNow from "../BuyNow/BuyNow";
import AuthPrompt from "../AuthPrompt/AuthPrompt";

import "./ProductInfo.css";

function ProductInfo({
  product,
  onAddToCart,
  onBuyNow
}) {

  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();
  const location = useLocation();

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
  };

  const handleBuyNow = () => {
    onBuyNow(product, quantity);
  };

  return (
    <div className="product-info">

      {/* Product Title */}

      <h1 className="product-title">
        {product.name}
      </h1>

      <div className="product-brand">
        Brand:
        <span>{product.brand}</span>
      </div>

      {/* Rating */}

      <Rating
        rating={product.rating}
        reviews={product.reviews}
      />

      <div className="info-divider"></div>

      {/* Deal */}

      <div className="deal-badge">
        Limited time deal
      </div>

      {/* Price */}

      <div className="price-row">

        <span className="discount-percent">
          -{product.discount}%
        </span>

        <span className="current-price">
          ${product.price.toFixed(2)}
        </span>

      </div>

      <div className="list-price">
        List Price:
        <span>
          ${product.oldPrice.toFixed(2)}
        </span>
      </div>

      <div className="info-divider"></div>

      {/* Delivery */}

      <div className="delivery-info">

        <div className="delivery-line">
          <span>FREE delivery</span>
          <strong> Tomorrow</strong>
        </div>

        <div className="delivery-line">
          Order within <strong>8 hrs 32 mins</strong>
        </div>

        <div className="delivery-location">
          📍 Deliver to your location
        </div>

        {!user && (
          <AuthPrompt
            compact
            title="Deliver to Ethiopia"
            message="Sign in to see your delivery estimate."
            destination={location}
          />
        )}

      </div>

      {/* Stock */}

      <div
        className={
          product.stock > 0
            ? "stock in-stock"
            : "stock out-of-stock"
        }
      >
        {product.stock > 0
          ? `In Stock (${product.stock} available)`
          : "Currently unavailable"}
      </div>

      {product.stock > 0 && (
        <>
          {/* Quantity */}

          <QuantitySelector
            quantity={quantity}
            setQuantity={setQuantity}
            maxQuantity={Math.min(product.stock, 10)}
          />

          {/* Purchase buttons */}

          <div className="purchase-buttons">

            <AddToCart
              onClick={handleAddToCart}
            />

            <BuyNow
              onClick={handleBuyNow}
            />

          </div>

          {/* Secure transaction */}

          <div className="secure-payment">
            🔒 Secure transaction
          </div>
        </>
      )}

      {/* Seller information */}

      <div className="seller-information">

        <div className="seller-row">
          <span>Ships from</span>
          <strong>Amazon</strong>
        </div>

        <div className="seller-row">
          <span>Sold by</span>
          <strong>{product.seller}</strong>
        </div>

        <div className="seller-row">
          <span>Returns</span>
          <strong>30-day return policy</strong>
        </div>

        <div className="seller-row">
          <span>Payment</span>
          <strong>Secure transaction</strong>
        </div>

      </div>

    </div>
  );
}

export default ProductInfo;