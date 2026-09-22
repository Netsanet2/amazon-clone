import "./SearchResults.css";
import ProductListing from "../ProductListing/ProductListing";

function SearchResults({ products, searchTerm }) {
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search-results">
      <h2>
        Search results for: "{searchTerm}"
      </h2>

      {filteredProducts.length > 0 ? (
        <ProductListing products={filteredProducts} />
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}

export default SearchResults;