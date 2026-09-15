import "./Filters.css";

function Filters({ filters, setFilters }) {
  const handleChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  return (
    <aside className="filters">
      <h2>Filters</h2>

      {/* Category */}
      <div className="filter-group">
        <h3>Category</h3>

        <select
          value={filters.category}
          onChange={(e) =>
            handleChange("category", e.target.value)
          }
        >
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Beauty">Beauty</option>
          <option value="Watches">Watches</option>
          <option value="Luxury">Luxury</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>

      {/* Price */}
      <div className="filter-group">
        <h3>Price</h3>

        <input
          type="number"
          placeholder="Minimum price"
          value={filters.minPrice}
          onChange={(e) =>
            handleChange("minPrice", e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Maximum price"
          value={filters.maxPrice}
          onChange={(e) =>
            handleChange("maxPrice", e.target.value)
          }
        />
      </div>

      {/* Rating */}
      <div className="filter-group">
        <h3>Rating</h3>

        <select
          value={filters.rating}
          onChange={(e) =>
            handleChange("rating", e.target.value)
          }
        >
          <option value="0">All Ratings</option>
          <option value="4">4★ & above</option>
          <option value="4.5">4.5★ & above</option>
        </select>
      </div>

      {/* Availability */}
      <div className="filter-group">
        <h3>Availability</h3>

        <select
          value={filters.availability}
          onChange={(e) =>
            handleChange("availability", e.target.value)
          }
        >
          <option value="All">All</option>
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </div>

      {/* Brand */}
      <div className="filter-group">
        <h3>Brand</h3>

        <select
          value={filters.brand}
          onChange={(e) =>
            handleChange("brand", e.target.value)
          }
        >
          <option value="All">All Brands</option>
          <option value="SoundMax">SoundMax</option>
          <option value="UrbanStyle">UrbanStyle</option>
          <option value="TechTime">TechTime</option>
          <option value="GlowCare">GlowCare</option>
          <option value="SportPro">SportPro</option>
          <option value="TravelGear">TravelGear</option>
          <option value="TechPro">TechPro</option>
          <option value="EliteTime">EliteTime</option>
          <option value="StyleHouse">StyleHouse</option>
          <option value="VisionPro">VisionPro</option>
          <option value="EliteBeauty">EliteBeauty</option>
        </select>
      </div>

      {/* Reset */}
      <button
        className="reset-filters"
        onClick={() =>
          setFilters({
            category: "All",
            minPrice: "",
            maxPrice: "",
            rating: "0",
            availability: "All",
            brand: "All",
          })
        }
      >
        Reset Filters
      </button>
    </aside>
  );
}

export default Filters;