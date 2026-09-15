// TodaysDealsPage.jsx
import React, { useState } from 'react';
import './TodaysDealsPage.css';

const TodaysDealsPage = () => {
  const [activeSubNav, setActiveSubNav] = useState("Today's Deals");
  const [activeTab, setActiveTab] = useState('Lightning deals');
  const [activeDepartment, setActiveDepartment] = useState('All');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minRating, setMinRating] = useState('All');

  // Data for the local sub-navigation
  const subNavItems = ["Today's Deals", "Coupons", "Renewed Deals", "Outlet", "Amazon Resale"];

  // Data for the horizontal scrolling tabs
  const dealTabs = [
    'Lightning deals', "Customers' Most-Loved", 'Outlet', 
    'Lowest Price in 365 Days', 'Premium Brands', 'Beauty', 
    'Fashion', 'Home', 'Toys & Games'
  ];

  // Data for the sidebar filters
  const departments = [
    'All', 'Amazon Devices & Accessories', 'Appliances', 
    'Arts, Crafts & Sewing', 'Audible Books & Originals'
  ];

  const brands = ['Filterbuy', 'Soalmast', 'Blink', 'SHOKZ'];

  const handleBrandToggle = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleClearFilters = () => {
    setActiveDepartment('All');
    setSelectedBrands([]);
    setMinRating('All');
  };

  return (
    <div className="deals-page-container">
      
      {/* 1. Local Sub-Navigation */}
      <div className="deals-sub-nav">
        {subNavItems.map((item) => (
          <button 
            key={item}
            className={`deals-sub-nav-btn ${activeSubNav === item ? 'active' : ''}`}
            onClick={() => setActiveSubNav(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* 2. Horizontal Filter Ribbon */}
      <div className="deals-tabs-wrapper">
        <button className="scroll-arrow left">‹</button>
        <div className="deals-tabs-scroll">
          {dealTabs.map((tab) => (
            <button 
              key={tab}
              className={`deal-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <button className="scroll-arrow right">›</button>
      </div>

      {/* 3. Main Content Area (Sidebar + Results) */}
      <div className="deals-main-layout">
        
        {/* Sidebar Filters */}
        <aside className="deals-sidebar">
          
          {/* Department Filter */}
          <div className="filter-group">
            <h4>Department</h4>
            <div className="radio-group">
              {departments.map((dept) => (
                <label key={dept} className="filter-label">
                  <input 
                    type="radio" 
                    name="department" 
                    checked={activeDepartment === dept}
                    onChange={() => setActiveDepartment(dept)}
                  />
                  <span>{dept}</span>
                </label>
              ))}
            </div>
            <button className="see-more-btn">See more</button>
          </div>

          {/* Brands Filter */}
          <div className="filter-group">
            <h4>Brands</h4>
           <div className="checkbox-group">
    {brands.map((brand) => (
      <label key={brand} className="filter-label">
        <input 
          type="checkbox" 
          checked={selectedBrands.includes(brand)}
          onChange={() => handleBrandToggle(brand)}
        />
        <span>{brand}</span>
      </label>
    ))}
  </div>
  <button className="see-more-btn">See more</button>
</div>

{/* Customer Reviews Filter */}
<div className="filter-group">
  <h4>Customer Reviews</h4>
  <div className="radio-group">
              <label className="filter-label">
                <input 
                  type="radio" 
                  name="rating" 
                  checked={minRating === 'All'}
                  onChange={() => setMinRating('All')}
                />
                <span>All</span>
              </label>
              <label className="filter-label">
                <input 
                  type="radio" 
                  name="rating" 
                  checked={minRating === '4'}
                  onChange={() => setMinRating('4')}
                />
                <span className="stars">★★★★☆ & up</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Results Area */}
        <main className="deals-results">
          {/* For now, showing the empty state from your screenshot */}
          <div className="empty-state">
            <h2>We couldn't find a match.</h2>
            <p>Try using fewer filters</p>
            <button className="clear-filters-btn" onClick={handleClearFilters}>
              Clear Filters
            </button>
          </div>

          {/* 
            NOTE: When you have deal data, replace the empty-state div above with this:
            <div className="deals-grid">
              {mockDeals.map(deal => <DealCard key={deal.id} deal={deal} />)}
            </div> 
          */}
        </main>
        </div>
      

      {/* 4. Back to Top Button */}
      <div className="back-to-top-wrapper">
        <button className="back-to-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Back to top
        </button>
      </div>
    </div> 
    
  );
};


export default TodaysDealsPage;