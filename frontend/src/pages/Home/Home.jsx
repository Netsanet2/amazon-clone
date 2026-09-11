import React from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Home.css';
import hero from "../../assets/school-hero.jpg";
const Home = () => {
  return (
    <main className="home">
      {/* HERO BANNER */}
      <section className="hero">
        <div className="hero-content">
          <h1>Shop Back to School</h1>
          <p>School essentials at every price</p>
        </div>
      </section>

      {/* THE 3-ROW GRID */}
      <div className="home-grid">
        
        {/* ================= ROW 1 ================= */}
        
        {/* Box 1: Fashion */}
        <div className="grid-box">
          <h2 className="box-title">Shop Fashions for less</h2>
          <div className="product-grid">
            <ProductCard product={{ title: 'Jeans', subtitle: 'under $50', price: '19.99', icon: 'fa-tshirt' }} />
            <ProductCard product={{ title: 'Tops', subtitle: 'under $25', price: '24.99', icon: 'fa-vest' }} />
            <ProductCard product={{ title: 'Dresses', subtitle: 'under $30', price: '29.99', icon: 'fa-female' }} />
            <ProductCard product={{ title: 'Shoes', subtitle: 'under $50', price: '49.99', icon: 'fa-shoe-prints' }} />
          </div>
          <span className="box-link">See more</span>
        </div>

        {/* Box 2: School Supplies */}
        <div className="grid-box">
          <h2 className="box-title">Must-have school supplies</h2>
          <div className="supplies-grid">
            <div className="supply-card"><i className="fas fa-backpack"></i><span>Backpacks</span></div>
            <div className="supply-card"><i className="fas fa-laptop"></i><span>Electronics</span></div>
            <div className="supply-card"><i className="fas fa-pen-fancy"></i><span>Stationery</span></div>
            <div className="supply-card"><i className="fas fa-book-open"></i><span>Books</span></div>
          </div>
          <span className="box-link">Shop now</span>
        </div>

        {/* Box 3: Gaming */}
        <div className="grid-box">
          <h2 className="box-title">Get your game on</h2>
          <div className="product-grid">
            <ProductCard product={{ title: 'Consoles', subtitle: 'PlayStation, Xbox', price: '299.99', icon: 'fa-gamepad' }} />
            <ProductCard product={{ title: 'Headsets', subtitle: 'Gaming audio', price: '59.99', icon: 'fa-headphones' }} />
            <ProductCard product={{ title: 'Monitors', subtitle: '144Hz displays', price: '199.99', icon: 'fa-desktop' }} />
            <ProductCard product={{ title: 'Mice', subtitle: 'Pro gaming', price: '49.99', icon: 'fa-mouse' }} />
          </div>
          <span className="box-link">See more</span>
        </div>

        {/* Box 4: Kitchen */}
        <div className="grid-box">
          <h2 className="box-title">Top categories in Kitchen</h2>
          <div className="supplies-grid">
            <div className="supply-card"><i className="fas fa-blender"></i><span>Cooker</span></div>
            <div className="supply-card"><i className="fas fa-utensils"></i><span>Dining</span></div>
            <div className="supply-card"><i className="fas fa-mug-hot"></i><span>Coffee</span></div>
            <div className="supply-card"><i className="fas fa-utensil-spoon"></i><span>Tools</span></div>
          </div>
          <span className="box-link">Explore now</span>
        </div>

        {/* ================= ROW 2 ================= */}
        
        {/* Box 5: Single Item */}
        <div className="grid-box">
          <h2 className="box-title">Top picks in Electronics</h2>
          <div className="single-item-layout">
            <div className="single-item-image"><i className="fas fa-laptop"></i></div>
            <span className="single-item-label">MacBook Pro 14"</span>
          </div>
          <span className="box-link">Shop now</span>
        </div>
        {/* Box 6: Fashion Grid */}
        <div className="grid-box">
          <h2 className="box-title">Trending fashion</h2>
          <div className="product-grid">
            <ProductCard product={{ title: 'Watches', subtitle: 'Luxury', price: '89.99', icon: 'fa-clock' }} />
            <ProductCard product={{ title: 'Bags', subtitle: 'Leather', price: '59.99', icon: 'fa-shopping-bag' }} />
            <ProductCard product={{ title: 'Sunglasses', subtitle: 'UV400', price: '29.99', icon: 'fa-glasses' }} />
            <ProductCard product={{ title: 'Hats', subtitle: 'Baseball', price: '19.99', icon: 'fa-hat-cowboy' }} />
          </div>
          <span className="box-link">See more</span>
        </div>

        {/* Box 7: Single Item */}
        <div className="grid-box">
          <h2 className="box-title">Home essentials</h2>
          <div className="single-item-layout">
            <div className="single-item-image"><i className="fas fa-blender"></i></div>
            <span className="single-item-label">Ninja Blender</span>
          </div>
          <span className="box-link">Explore now</span>
        </div>

        {/* Box 8: Books Grid */}
        <div className="grid-box">
          <h2 className="box-title">Books for you</h2>
          <div className="product-grid">
            <ProductCard product={{ title: 'Fiction', subtitle: 'Best sellers', price: '14.99', icon: 'fa-book' }} />
            <ProductCard product={{ title: 'Non-Fiction', subtitle: 'Top rated', price: '19.99', icon: 'fa-book-open' }} />
            <ProductCard product={{ title: 'Comics', subtitle: 'Marvel & DC', price: '9.99', icon: 'fa-book-dead' }} />
            <ProductCard product={{ title: 'Kids', subtitle: 'Bedtime stories', price: '11.99', icon: 'fa-book-reader' }} />
          </div>
          <span className="box-link">See more</span>
        </div>

        {/* ================= ROW 3 ================= */}
        
        {/* Box 9: Single Item */}
        <div className="grid-box">
          <h2 className="box-title">Toys & games</h2>
          <div className="single-item-layout">
            <div className="single-item-image"><i className="fas fa-gamepad"></i></div>
            <span className="single-item-label">Nintendo Switch</span>
          </div>
          <span className="box-link">Shop now</span>
        </div>

        {/* Box 10: Beauty Grid */}
        <div className="grid-box">
          <h2 className="box-title">Beauty picks</h2>
          <div className="product-grid">
            <ProductCard product={{ title: 'Makeup', subtitle: 'Brands', price: '24.99', icon: 'fa-paint-brush' }} />
            <ProductCard product={{ title: 'Skincare', subtitle: 'Routines', price: '34.99', icon: 'fa-spa' }} />
            <ProductCard product={{ title: 'Hair', subtitle: 'Care & style', price: '19.99', icon: 'fa-cut' }} />
            <ProductCard product={{ title: 'Fragrance', subtitle: 'Perfume', price: '79.99', icon: 'fa-spray-can' }} />
          </div>
          <span className="box-link">See more</span>
        </div>

        {/* Box 11: Single Item */}
        <div className="grid-box">
          <h2 className="box-title">Sports & outdoors</h2>
          <div className="single-item-layout">
            <div className="single-item-image"><i className="fas fa-basketball-ball"></i></div>
            <span className="single-item-label">Spalding NBA</span>
          </div>
          <span className="box-link">Shop now</span>
        </div>

        {/* Box 12: Pet Grid */}
        <div className="grid-box">
          <h2 className="box-title">Pet supplies</h2>
          <div className="product-grid">
            <ProductCard product={{ title: 'Dog Food', subtitle: 'Dry & wet', price: '39.99', icon: 'fa-dog' }} />
            <ProductCard product={{ title: 'Cat Toys', subtitle: 'Interactive', price: '14.99', icon: 'fa-cat' }} />
            <ProductCard product={{ title: 'Beds', subtitle: 'Cozy', price: '49.99', icon: 'fa-bed' }} />
            <ProductCard product={{ title: 'Leashes', subtitle: 'Durable', price: '12.99', icon: 'fa-link' }} />
          </div>
          <span className="box-link">See more</span>
        </div>

      </div>
    </main>
  );
};

export default Home;