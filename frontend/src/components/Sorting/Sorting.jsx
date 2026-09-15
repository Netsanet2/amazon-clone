import "./Sorting.css";

function Sorting({ sortBy, setSortBy }) {
  return (
    <div className="sorting">
      <label htmlFor="sort">Sort by:</label>

      <select
        id="sort"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="default">Featured</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="rating">Rating</option>
        <option value="newest">Newest</option>
      </select>
    </div>
  );
}

export default Sorting;