import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-text">
          <h1>Big Deals, Every Day</h1>
          <p>Shop the latest electronics, fashion, and more — all in one place.</p>
          <Link to="/products" className="hero-button">Shop Now</Link>
        </div>
      </section>

      <section className="deals">
        <h2>Today's Deals</h2>
        <div className="deals-grid">
          <div className="deal-card">
            <div className="deal-image-placeholder">📱</div>
            <p className="deal-title">Smartphones</p>
            <p className="deal-price">Up to 30% off</p>
          </div>
          <div className="deal-card">
            <div className="deal-image-placeholder">👕</div>
            <p className="deal-title">Fashion</p>
            <p className="deal-price">Up to 50% off</p>
          </div>
          <div className="deal-card">
            <div className="deal-image-placeholder">🏠</div>
            <p className="deal-title">Home & Kitchen</p>
            <p className="deal-price">Up to 40% off</p>
          </div>
          <div className="deal-card">
            <div className="deal-image-placeholder">💄</div>
            <p className="deal-title">Beauty</p>
            <p className="deal-price">Up to 25% off</p>
          </div>
        </div>
      </section>

      <section className="recommendations">
        <h2>Recommended for You</h2>
        <p className="recommendations-note">
          (Real product cards will show here once the Products team's data is connected.)
        </p>
      </section>
    </div>
  );
}

export default Home;