// RegistryPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './RegistryPage.css';

const RegistryPage = () => {
  const registryCards = [
    {
      id: 'baby',
      image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=500&q=80',
      title: 'Baby Registry',
      desc: 'Get help preparing for your new arrival.'
    },
    {
      id: 'wedding',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=500&q=80',
      title: 'Wedding Registry',
      desc: 'Register for gifts to start your new chapter.'
    },
    {
      id: 'gift',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=500&q=80',
      title: 'Gift List',
      desc: 'Share gift ideas or needs for birthdays, holidays, graduations, new homes and more.'
    }
  ];

  return (
    <div className="registry-page-container">
      
      {/* 1. Local Sub-Navigation */}
      <div className="registry-sub-nav">
        <Link to="/registry" className="registry-brand">registry & gifting</Link>
        <Link to="/registry/find" className="registry-nav-link">Find a registry or gift list</Link>
        <Link to="/registry/create" className="registry-nav-link">Create a registry or gift list</Link>
        <Link to="/registry/help" className="registry-nav-link">Help</Link>
      </div>

      {/* 2. Main Split Layout */}
      <div className="registry-main-layout">
        
        {/* Left Column: Text and Buttons */}
        <div className="registry-left-col">
          <h1>Inspiration for life's biggest moments</h1>
          <p>For weddings, babies, birthdays, or any life event, registries and gift lists ensure the perfect item.</p>
          
          <Link to="/registry/find" className="registry-btn btn-outline">
            Find a registry
          </Link>
          <Link to="/registry/create" className="registry-btn btn-yellow">
            Create
          </Link>
        </div>

        {/* Right Column: Image Cards */}
        <div className="registry-right-col">
          {registryCards.map((card) => (
            <Link to={`/registry/${card.id}`} className="registry-card" key={card.id}>
              <div className="registry-card-image-wrapper">
                <img src={card.image} alt={card.title} className="registry-card-image" />
              </div>
              <div className="registry-card-content">
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            </Link>
          ))}
        </div>

      </div>

      {/* 3. Bottom Section */}
      <div className="registry-reasons">
        <h2>Reasons to register with Amazon</h2>
        {/* You can add the benefit cards here later */}
      </div>

    </div>
  );
};

export default RegistryPage;