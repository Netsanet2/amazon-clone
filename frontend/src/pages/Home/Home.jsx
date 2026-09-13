import React from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Home.css';
import hero from "../../assets/school-hero.jpg";
import { useLanguage } from "../LanguageContext/LanguageContext";

const translations = {
  EN: {
    heroTitle: "Shop Back to School",
    heroSub: "School essentials at every price",
    fashionTitle: "Shop Fashions for less",
    suppliesTitle: "Must-have school supplies",
    gamingTitle: "Get your game on",
    kitchenTitle: "Top categories in Kitchen",
    electronicsTitle: "Top picks in Electronics",
    trendingFashionTitle: "Trending fashion",
    homeTitle: "Home essentials",
    booksTitle: "Books for you",
    toysTitle: "Toys & games",
    beautyTitle: "Beauty picks",
    sportsTitle: "Sports & outdoors",
    petsTitle: "Pet supplies",
    seeMore: "See more",
    shopNow: "Shop now",
    exploreNow: "Explore now",
  },
  ES: {
    heroTitle: "Compra de regreso a clases",
    heroSub: "Lo esencial para la escuela a cualquier precio",
    fashionTitle: "Moda a menor precio",
    suppliesTitle: "Útiles escolares imprescindibles",
    gamingTitle: "Prepárate para jugar",
    kitchenTitle: "Categorías principales en Cocina",
    electronicsTitle: "Lo mejor en Electrónica",
    trendingFashionTitle: "Moda en tendencia",
    homeTitle: "Esenciales para el hogar",
    booksTitle: "Libros para ti",
    toysTitle: "Juguetes y juegos",
    beautyTitle: "Lo mejor en Belleza",
    sportsTitle: "Deportes y aire libre",
    petsTitle: "Artículos para mascotas",
    seeMore: "Ver más",
    shopNow: "Comprar ahora",
    exploreNow: "Explorar ahora",
  },
  AR: {
    heroTitle: "تسوق العودة إلى المدرسة",
    heroSub: "مستلزمات المدرسة بأفضل الأسعار",
    fashionTitle: "تسوق الأزياء بأسعار أقل",
    suppliesTitle: "المستلزمات المدرسية الأساسية",
    gamingTitle: "احصل على ألعابك",
    kitchenTitle: "أبرز الفئات في المطبخ",
    electronicsTitle: "أفضل الاختيارات في الإلكترونيات",
    trendingFashionTitle: "أحدث صيحات الموضة",
    homeTitle: "مستلزمات المنزل",
    booksTitle: "كتب من أجلك",
    toysTitle: "الألعاب والترفيه",
    beautyTitle: "مستحضرات التجميل",
    sportsTitle: "الرياضة والأنشطة الخارجية",
    petsTitle: "مستلزمات الحيوانات الأليفة",
    seeMore: "عرض المزيد",
    shopNow: "تسوق الآن",
    exploreNow: "استكشف الآن",
  },
  DE: {
    heroTitle: "Back to School einkaufen",
    heroSub: "Schulbedarf für jedes Budget",
    fashionTitle: "Mode günstiger shoppen",
    suppliesTitle: "Unverzichtbarer Schulbedarf",
    gamingTitle: "Spielenszeit",
    kitchenTitle: "Top-Kategorien in Küche",
    electronicsTitle: "Top-Angebote in Elektronik",
    trendingFashionTitle: "Trendy Mode",
    homeTitle: "Haushaltsartikel",
    booksTitle: "Bücher für dich",
    toysTitle: "Spielzeug & Spiele",
    beautyTitle: "Beauty-Highlights",
    sportsTitle: "Sport & Freizeit",
    petsTitle: "Haustierbedarf",
    seeMore: "Mehr anzeigen",
    shopNow: "Jetzt shoppen",
    exploreNow: "Jetzt entdecken",
  },
};

const Home = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.EN;

  return (
    <main className="home">
      {/* HERO BANNER */}
      <section className="hero" style={{ backgroundImage: `url(${hero})` }}>
        <div className="hero-content">
          <h1>{t.heroTitle}</h1>
          <p>{t.heroSub}</p>
        </div>
      </section>

      {/* THE 3-ROW GRID */}
      <div className="home-grid">

        {/* ================= ROW 1 ================= */}

        {/* Box 1: Fashion */}
        <div className="grid-box">
          <h2 className="box-title">{t.fashionTitle}</h2>
          <div className="product-grid">
            <ProductCard product={{ title: 'Jeans', subtitle: 'under $50', price: '19.99', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300' }} />
            <ProductCard product={{ title: 'Tops', subtitle: 'under $25', price: '24.99', icon: 'fa-vest' }} />
            <ProductCard product={{ title: 'Dresses', subtitle: 'under $30', price: '29.99', icon: 'fa-female' }} />
            <ProductCard product={{ title: 'Shoes', subtitle: 'under $50', price: '49.99', icon: 'fa-shoe-prints' }} />
          </div>
          <span className="box-link">{t.seeMore}</span>
        </div>

        {/* Box 2: School Supplies */}
        <div className="grid-box">
          <h2 className="box-title">{t.suppliesTitle}</h2>
          <div className="supplies-grid">
            <div className="supply-card"><i className="fas fa-backpack"></i><span>Backpacks</span></div>
            <div className="supply-card"><i className="fas fa-laptop"></i><span>Electronics</span></div>
            <div className="supply-card"><i className="fas fa-pen-fancy"></i><span>Stationery</span></div>
            <div className="supply-card"><i className="fas fa-book-open"></i><span>Books</span></div>
          </div>
          <span className="box-link">{t.shopNow}</span>
        </div>

        {/* Box 3: Gaming */}
        <div className="grid-box">
          <h2 className="box-title">{t.gamingTitle}</h2>
          <div className="product-grid">
            <ProductCard product={{ title: 'Consoles', subtitle: 'PlayStation, Xbox', price: '299.99', icon: 'fa-gamepad' }} />
            <ProductCard product={{ title: 'Headsets', subtitle: 'Gaming audio', price: '59.99', icon: 'fa-headphones' }} />
            <ProductCard product={{ title: 'Monitors', subtitle: '144Hz displays', price: '199.99', icon: 'fa-desktop' }} />
            <ProductCard product={{ title: 'Mice', subtitle: 'Pro gaming', price: '49.99', icon: 'fa-mouse' }} />
          </div>
          <span className="box-link">{t.seeMore}</span>
        </div>

        {/* Box 4: Kitchen */}
        <div className="grid-box">
          <h2 className="box-title">{t.kitchenTitle}</h2>
          <div className="supplies-grid">
            <div className="supply-card"><i className="fas fa-blender"></i><span>Cooker</span></div>
            <div className="supply-card"><i className="fas fa-utensils"></i><span>Dining</span></div>
            <div className="supply-card"><i className="fas fa-mug-hot"></i><span>Coffee</span></div>
            <div className="supply-card"><i className="fas fa-utensil-spoon"></i><span>Tools</span></div>
          </div>
          <span className="box-link">{t.exploreNow}</span>
        </div>

        {/* ================= ROW 2 ================= */}

        {/* Box 5: Single Item */}
        <div className="grid-box">
          <h2 className="box-title">{t.electronicsTitle}</h2>
          <div className="single-item-layout">
            <div className="single-item-image"><i className="fas fa-laptop"></i></div>
            <span className="single-item-label">MacBook Pro 14"</span>
          </div>
          <span className="box-link">{t.shopNow}</span>
        </div>

        {/* Box 6: Fashion Grid */}
        <div className="grid-box">
          <h2 className="box-title">{t.trendingFashionTitle}</h2>
          <div className="product-grid">
            <ProductCard product={{ title: 'Watches', subtitle: 'Luxury', price: '89.99', icon: 'fa-clock' }} />
            <ProductCard product={{ title: 'Bags', subtitle: 'Leather', price: '59.99', icon: 'fa-shopping-bag' }} />
            <ProductCard product={{ title: 'Sunglasses', subtitle: 'UV400', price: '29.99', icon: 'fa-glasses' }} />
            <ProductCard product={{ title: 'Hats', subtitle: 'Baseball', price: '19.99', icon: 'fa-hat-cowboy' }} />
          </div>
          <span className="box-link">{t.seeMore}</span>
        </div>

        {/* Box 7: Single Item */}
        <div className="grid-box"></div>
        <h2 className="box-title">{t.homeTitle}</h2>
          <div className="single-item-layout">
            <div className="single-item-image"><i className="fas fa-blender"></i></div>
            <span className="single-item-label">Ninja Blender</span>
          </div>
          <span className="box-link">{t.exploreNow}</span>
        </div>

        {/* Box 8: Books Grid */}
        <div className="grid-box">
          <h2 className="box-title">{t.booksTitle}</h2>
          <div className="product-grid">
            <ProductCard product={{ title: 'Fiction', subtitle: 'Best sellers', price: '14.99', icon: 'fa-book' }} />
            <ProductCard product={{ title: 'Non-Fiction', subtitle: 'Top rated', price: '19.99', icon: 'fa-book-open' }} />
            <ProductCard product={{ title: 'Comics', subtitle: 'Marvel & DC', price: '9.99', icon: 'fa-book-dead' }} />
            <ProductCard product={{ title: 'Kids', subtitle: 'Bedtime stories', price: '11.99', icon: 'fa-book-reader' }} />
          </div>
          <span className="box-link">{t.seeMore}</span>
        </div>

        {/* ================= ROW 3 ================= */}

        {/* Box 9: Single Item */}
        <div className="grid-box">
          <h2 className="box-title">{t.toysTitle}</h2>
          <div className="single-item-layout">
            <div className="single-item-image"><i className="fas fa-gamepad"></i></div>
            <span className="single-item-label">Nintendo Switch</span>
          </div>
          <span className="box-link">{t.shopNow}</span>
        </div>

        {/* Box 10: Beauty Grid */}
        <div className="grid-box">
          <h2 className="box-title">{t.beautyTitle}</h2>
          <div className="product-grid">
            <ProductCard product={{ title: 'Makeup', subtitle: 'Brands', price: '24.99', icon: 'fa-paint-brush' }} />
            <ProductCard product={{ title: 'Skincare', subtitle: 'Routines', price: '34.99', icon: 'fa-spa' }} />
            <ProductCard product={{ title: 'Hair', subtitle: 'Care & style', price: '19.99', icon: 'fa-cut' }} />
            <ProductCard product={{ title: 'Fragrance', subtitle: 'Perfume', price: '79.99', icon: 'fa-spray-can' }} />
          </div>
          <span className="box-link">{t.seeMore}</span>
        </div>

        {/* Box 11: Single Item */}
        <div className="grid-box">
          <h2 className="box-title">{t.sportsTitle}</h2>
          <div className="single-item-layout">
            <div className="single-item-image"><i className="fas fa-basketball-ball"></i></div>
            <span className="single-item-label">Spalding NBA</span>
          </div>
          <span className="box-link">{t.shopNow}</span>
        </div>

        {/* Box 12: Pet Grid */}
        <div className="grid-box">
          <h2 className="box-title">{t.petsTitle}</h2>
          <div className="product-grid">
            <ProductCard product={{ title: 'Dog Food', subtitle: 'Dry & wet', price: '39.99', icon: 'fa-dog' }} />
            <ProductCard product={{ title: 'Cat Toys', subtitle: 'Interactive', price: '14.99', icon: 'fa-cat' }} />
            <ProductCard product={{ title: 'Beds', subtitle: 'Cozy', price: '49.99', icon: 'fa-bed' }} />
            <ProductCard product={{ title: 'Leashes', subtitle: 'Durable', price: '12.99', icon: 'fa-link' }} />
          </div>
          <span className="box-link">{t.seeMore}</span>
        </div>

      
    </main>
  );
};

export default Home;