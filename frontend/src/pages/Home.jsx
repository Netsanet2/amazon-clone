import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProducts } from "../services/productService";

import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        setProducts(data);
      } catch (error) {
        console.error("Failed to load Home products:", error);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="home-page">
      {/* Hero Banner */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Amazon Clone</h1>
          <p>Discover great products at amazing prices.</p>

          <Link to="/product/1" className="shop-button">
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
              to={`/product/${product.id}`}
              className="home-product-card"
              key={product.id}
            >
              <img
                src={
                  product.image ||
                  product.images?.[0] ||
                  ""
                }
                alt={product.name}
              />

              <h3>{product.name}</h3>

              <div className="home-rating">
                {"★".repeat(Math.round(product.rating || 0))}
                {"☆".repeat(
                  5 - Math.round(product.rating || 0)
                )}

                <span>
                  {product.reviews
                    ? product.reviews.toLocaleString()
                    : "0"}{" "}
                  ratings
                </span>
              </div>

              <div className="home-price">
                ${Number(product.price || 0).toFixed(2)}
              </div>

              <div className="home-old-price">
                $
                {Number(
                  product.oldPrice || product.price || 0
                ).toFixed(2)}
              </div>

              <span className="home-deal">
                -{product.discount || 0}%
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;