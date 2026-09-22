import "./AboutAmazon.css";

function AboutAmazon() {
  return (
    <div className="about-amazon-page">
      <section className="about-amazon-hero">
        <h1>About Amazon</h1>
        <p>
          Learn more about Amazon, our mission, and how we work to make
          shopping easier and more convenient for customers.
        </p>
      </section>

      <section className="about-amazon-content">
        <div className="about-amazon-section">
          <h2>Our Mission</h2>
          <p>
            Our goal is to create a convenient shopping experience where
            customers can discover products, compare choices, and place orders
            easily.
          </p>
        </div>

        <div className="about-amazon-section">
          <h2>Customer Experience</h2>
          <p>
            We focus on making the shopping journey simple, reliable, and
            enjoyable, from discovering a product to receiving an order.
          </p>
        </div>

        <div className="about-amazon-section">
          <h2>Our Store</h2>
          <p>
            Explore our products, discover different categories, and enjoy a
            smooth shopping experience.
          </p>
        </div>
      </section>
    </div>
  );
}

export default AboutAmazon;