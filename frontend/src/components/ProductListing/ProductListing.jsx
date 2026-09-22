import "./ProductListing.css";
import ProductCard from "../ProductCard/ProductCard";

function ProductListing({ products }) {
  return (
    <div className="product-listing">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductListing;