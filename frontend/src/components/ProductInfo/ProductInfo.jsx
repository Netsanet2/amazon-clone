import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import Rating from "../Rating/Rating";
import QuantitySelector from "../QuantitySelector/QuantitySelector";
import AddToCart from "../AddToCart/AddToCart";
import BuyNow from "../BuyNow/BuyNow";

import "./ProductInfo.css";

function ProductInfo({
  product,
  onAddToCart,
  onBuyNow,
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
      <h1 className="product-title">
        {product.name}
      </h1>

      <div className="product-rating">
        <Rating rating={product.rating} />
        <span className="review-count">
          {product.reviews} reviews
        </span>
      </div>

      <div className="product-price-section">
        {product.oldPrice > product.price && (
          <span className="product-old-price">
            ${Number(product.oldPrice).toFixed(2)}
          </span>
        )}

        <span className="product-price">
          ${Number(product.price).toFixed(2)}
        </span>

        {product.discount > 0 && (
          <span className="product-discount">
            {product.discount}% off
          </span>
        )}
      </div>

      {product.description && (
        <div className="product-description">
          {product.description.map(
            (description, index) => (
              <p key={index}>{description}</p>
            )
          )}
        </div>
      )}

      <div className="product-stock">
        {product.stock > 0 ? (
          <span className="in-stock">
            In Stock
          </span>
        ) : (
          <span className="out-of-stock">
            Currently unavailable
          </span>
        )}
      </div>

      {product.stock > 0 && (
        <>
          <QuantitySelector
            quantity={quantity}
            setQuantity={setQuantity}
            maxQuantity={Math.min(
              product.stock,
              10
            )}
          />

          <div className="purchase-buttons">
            <AddToCart
              onClick={handleAddToCart}
            />

            <BuyNow
              onClick={handleBuyNow}
            />
          </div>

          {!user && (
            <p className="login-message">
              You can add this item to your cart
              after logging in.
            </p>
          )}
        </>
      )}

      <div className="product-details">
        <p>
          <strong>Brand:</strong>{" "}
          {product.brand}
        </p>

        <p>
          <strong>Category:</strong>{" "}
          {product.category}
        </p>

        {product.seller && (
          <p>
            <strong>Sold by:</strong>{" "}
            {product.seller}
          </p>
        )}

        {product.delivery && (
          <p>
            <strong>Delivery:</strong>{" "}
            {product.delivery}
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductInfo;