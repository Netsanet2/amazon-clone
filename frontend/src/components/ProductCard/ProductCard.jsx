import "./ProductCard.css";
function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>

        <p className="product-brand">{product.brand}</p>

        <div className="product-rating">
          ⭐ {product.rating}
        </div>

        <p className="product-price">${product.price.toFixed(2)}</p>

        <p
          className={
            product.availability === "In Stock"
              ? "product-available"
              : "product-unavailable"
          }
        >
          {product.availability}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;