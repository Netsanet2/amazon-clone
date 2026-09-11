import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query)}&category=${category}`);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <select 
        className="search-select" 
        value={category} 
        onChange={(e) => setCategory(e.target.value)}
      >
        <option>All</option>
        <option>Electronics</option>
        <option>Fashion</option>
        <option>Home</option>
        <option>Beauty</option>
        <option>Toys</option>
      </select>
      <input
        type="text"
        className="search-input"
        placeholder="Search Amazon"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="search-btn">
        <i className="fas fa-search"></i>
      </button>
    </form>
  );
};

export default SearchBar;
