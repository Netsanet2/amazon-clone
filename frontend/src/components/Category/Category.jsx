import "./Category.css";
import ProductListing from "../ProductListing/ProductListing";

function Category({ products, selectedCategory }) {
  const categoryProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        );

  return (
    <div className="category-page">
      <h2>{selectedCategory}</h2>

      {categoryProducts.length > 0 ? (
        <ProductListing products={categoryProducts} />
      ) : (
        <p>No products found in this category.</p>
      )}
    </div>
  );
}

export default Category;