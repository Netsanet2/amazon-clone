import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <button
          className="footer-back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Back to top
        </button>
      </div>

      <div className="footer-main">
        <div className="footer-column">
          <h4>Get to Know Us</h4>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Press Releases</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Connect with Us</h4>
          <ul>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Let Us Help You</h4>
          <ul>
            <li>Your Account</li>
            <li>Returns & Orders</li>
            <li>Help</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} MyStore Clone — Internship Project</p>
      </div>
    </footer>
  );
}

export default Footer;