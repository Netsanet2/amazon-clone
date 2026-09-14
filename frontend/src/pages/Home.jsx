import { Link } from "react-router-dom";
import products from "../data/products";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      {/* Hero Banner */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Amazon Clone</h1>
          <p>Discover great products at amazing prices.</p>

          <Link to="/products/1" className="shop-button">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Product Section */}
      <section className="home-products">
        <h2>Featured Products</h2>

        <div className="product-grid">
          {products.map((product) => (
            <Link
              to={`/products/${product.id}`}
              className="home-product-card"
              key={product.id}
            >
              <img
                src={product.images[0]}
                alt={product.name}
              />

              <h3>{product.name}</h3>

              <div className="home-rating">
                ★★★★★
                <span>
                  {product.reviews.toLocaleString()} ratings
                </span>
              </div>

              <div className="home-price">
                ${product.price.toFixed(2)}
              </div>

              <div className="home-old-price">
                ${product.oldPrice.toFixed(2)}
              </div>

              <span className="home-deal">
                -{product.discount}%
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;