import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Home.css';
import hero from '../../assets/school-hero.jpg';
import { useLanguage } from '../LanguageContext/LanguageContext';

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

const handleImgError = (e) => {
  e.target.onerror = null;
  e.target.src = "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=500&q=80";
};

// Array of slider items (Updated bright gaming background)
const heroSlides = [
  {
    image: hero,
    titleKey: "heroTitle",
    subKey: "heroSub"
  },
  {
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80",
    titleKey: "gamingTitle",
    subKey: "heroSub"
  },
  {
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80",
    titleKey: "trendingFashionTitle",
    subKey: "heroSub"
  }
];

const Home = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.EN;

  const [currentIndex, setCurrentIndex] = useState(0);

  // Cycle background image every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = heroSlides[currentIndex];

  return (
    <main className="home">
      {/* CLEAN SINGLE-HERO BANNER WITH DYNAMIC BACKGROUND */}
      <section 
        className="hero" 
        style={{ backgroundImage: `url(${currentSlide.image})` }}
      >
        <div className="hero-content">
          <h1>{t[currentSlide.titleKey] || t.heroTitle}</h1>
          <p>{t[currentSlide.subKey] || t.heroSub}</p>
        </div>
      </section>

      {/* THE 3-ROW GRID */}
      <div className="home-grid">

        {/* ================= ROW 1 ================= */}

        {/* Box 1: Fashion */}
        <div className="grid-box">
          <h2 className="box-title">{t.fashionTitle}</h2>
          <div className="product-grid">
            <ProductCard product={{ title: 'Jeans', subtitle: 'under $50', price: '19.99', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=400&q=80' }} />
            <ProductCard product={{ title: 'Tops', subtitle: 'under $25', price: '24.99', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80' }} />
            <ProductCard product={{ title: 'Dresses', subtitle: 'under $30', price: '29.99', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=400&q=80' }} />
            <ProductCard product={{ title: 'Shoes', subtitle: 'under $50', price: '49.99', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80' }} />
          </div>
          <span className="box-link">{t.seeMore}</span>
        </div>

        {/* Box 2: School Supplies */}
        <div className="grid-box">
          <h2 className="box-title">{t.suppliesTitle}</h2>
          <div className="product-grid">
            <ProductCard 
              product={{ 
                title: 'Backpacks', 
                subtitle: 'Durable & stylish', 
                price: '29.99', 
                image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80' 
              }} 
            />
            <ProductCard 
              product={{ 
                title: 'Electronics', 
                subtitle: 'Calculators & tech', 
                price: '49.99', 
                image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=400&q=80' 
              }} 
            />
            <ProductCard 
              product={{ 
                title: 'Stationery', 
                subtitle: 'Pens, pads & sets', 
                price: '12.99', 
                image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=400&q=80' 
              }} 
            />
            <ProductCard 
              product={{ 
                title: 'Books', 
                subtitle: 'Notebooks & study', 
                price: '15.99', 
                image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80' 
              }} 
            />
          </div>
          <span className="box-link">{t.shopNow}</span>
        </div>

        {/* Box 3: Gaming */}
        <div className="grid-box">
          <h2 className="box-title">{t.gamingTitle}</h2>
          <div className="product-grid">
            <ProductCard product={{ title: 'Consoles', subtitle: 'PlayStation, Xbox', price: '299.99', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=400&q=80' }} />
            <ProductCard product={{ title: 'Headsets', subtitle: 'Gaming audio', price: '59.99', image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&q=80' }} />
            <ProductCard product={{ title: 'Monitors', subtitle: '144Hz displays', price: '199.99', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=80' }} />
            <ProductCard product={{ title: 'Mice', subtitle: 'Pro gaming', price: '49.99', image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=400&q=80' }} />
          </div>
          <span className="box-link">{t.seeMore}</span>
        </div>

        {/* Box 4: Kitchen */}
        <div className="grid-box">
          <h2 className="box-title">{t.kitchenTitle}</h2>
          <div className="product-grid">
            <ProductCard product={{ 
              title: 'Cookers', 
              subtitle: 'Pots & pressure cookers', 
              price: '89.99', 
              image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=400&q=80' 
            }} />
            <ProductCard product={{ 
              title: 'Coffee', 
              subtitle: 'Makers & espresso', 
              price: '34.99', 
              image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=400&q=80' 
            }} />
            <ProductCard product={{ 
              title: 'Dining', 
              subtitle: 'Dinnerware sets', 
              price: '45.99', 
              image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=400&q=80' 
            }} />
            <ProductCard product={{ 
              title: 'Tools', 
              subtitle: 'Utensils & gadgets', 
              price: '19.99', 
              image: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=400&q=80' 
            }} />
          </div>
          <span className="box-link">{t.exploreNow}</span>
        </div>

        {/* ================= ROW 2 ================= */}

        {/* Box 5: Single Item */}
        <div className="grid-box">
          <h2 className="box-title">{t.electronicsTitle}</h2>
          <div className="single-item-layout">
            <div className="single-item-image">
              <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80" alt="MacBook Pro" onError={handleImgError} />
            </div>
            <span className="single-item-label">MacBook Pro 14"</span>
          </div>
          <span className="box-link">{t.shopNow}</span>
        </div>

        {/* Box 6: Trending Fashion */}
        <div className="grid-box">
          <h2 className="box-title">{t.trendingFashionTitle}</h2>
          <div className="product-grid">
            <ProductCard product={{ 
              title: 'Watches', 
              subtitle: 'Timepieces', 
              price: '89.99', 
              image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=400&q=80' 
            }} />
            <ProductCard product={{ 
              title: 'Bags', 
              subtitle: 'Handbags & totes', 
              price: '59.99', 
              image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80' 
            }} />
            <ProductCard product={{ 
              title: 'Eyewear', 
              subtitle: 'UV protection', 
              price: '29.99', 
              image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80' 
            }} />
            <ProductCard product={{ 
              title: 'Hats', 
              subtitle: 'Caps & headwear', 
              price: '19.99', 
              image: 'https://images.unsplash.com/photo-1534215754734-18e55d13ce35?auto=format&fit=crop&w=400&q=80'
            }} />
          </div>
          <span className="box-link">{t.seeMore}</span>
        </div>

        {/* Box 7: Single Item */}
        <div className="grid-box">
          <h2 className="box-title">{t.homeTitle}</h2>
          <div className="single-item-layout">
            <div className="single-item-image">
              <img src="https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=600&q=80" alt="Ninja Blender" onError={handleImgError} />
            </div>
            <span className="single-item-label">Ninja Blender</span>
          </div>
          <span className="box-link">{t.exploreNow}</span>
        </div>

        {/* Box 8: Books Grid */}
        <div className="grid-box">
          <h2 className="box-title">{t.booksTitle}</h2>
          <div className="product-grid">
            <ProductCard product={{ title: 'Fiction', subtitle: 'Best sellers', price: '14.99', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80' }} />
            <ProductCard product={{ title: 'Non-Fiction', subtitle: 'Top rated', price: '19.99', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80' }} />
            <ProductCard product={{ title: 'Comics', subtitle: 'Marvel & DC', price: '9.99', image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80' }} />
            <ProductCard product={{ title: 'Kids', subtitle: 'Bedtime stories', price: '11.99', image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=400&q=80' }} />
          </div>
          <span className="box-link">{t.seeMore}</span>
        </div>

        {/* ================= ROW 3 ================= */}

        {/* Box 9: Single Item */}
        <div className="grid-box">
          <h2 className="box-title">{t.toysTitle}</h2>
          <div className="single-item-layout">
            <div className="single-item-image">
              <img src="https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=600&q=80" alt="Nintendo Switch" onError={handleImgError} />
            </div>
            <span className="single-item-label">Nintendo Switch</span>
          </div>
          <span className="box-link">{t.shopNow}</span>
        </div>

        {/* Box 10: Beauty Grid */}
        <div className="grid-box">
          <h2 className="box-title">{t.beautyTitle}</h2>
          <div className="product-grid">
            <ProductCard product={{ title: 'Makeup', subtitle: 'Brands', price: '24.99', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=400&q=80' }} />
            <ProductCard product={{ title: 'Skincare', subtitle: 'Routines', price: '34.99', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=400&q=80' }} />
            <ProductCard product={{ title: 'Hair', subtitle: 'Care & style', price: '19.99', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80' }} />
            <ProductCard product={{ title: 'Fragrance', subtitle: 'Perfume', price: '79.99', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=400&q=80' }} />
          </div>
          <span className="box-link">{t.seeMore}</span>
        </div>

        {/* Box 11: Single Item */}
        <div className="grid-box">
          <h2 className="box-title">{t.sportsTitle}</h2>
          <div className="single-item-layout">
            <div className="single-item-image">
              <img src="https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=600&q=80" alt="Spalding NBA" onError={handleImgError} />
            </div>
            <span className="single-item-label">Spalding NBA</span>
          </div>
          <span className="box-link">{t.shopNow}</span>
        </div>

        {/* Box 12: Pet Grid */}
        <div className="grid-box">
          <h2 className="box-title">{t.petsTitle}</h2>
          <div className="product-grid">
            <ProductCard product={{ title: 'Dog Food', subtitle: 'Dry & wet', price: '39.99', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=400&q=80' }} />
            <ProductCard product={{ title: 'Cat Toys', subtitle: 'Interactive', price: '14.99', image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=400&q=80' }} />
            <ProductCard product={{ title: 'Beds', subtitle: 'Cozy', price: '49.99', image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=400&q=80' }} />
            <ProductCard product={{ title: 'Leashes', subtitle: 'Durable', price: '16.99', image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=400&q=80' }} />
          </div>
          <span className="box-link">{t.seeMore}</span>
        </div>

      </div>
    </main>
  );
};

export default Home;