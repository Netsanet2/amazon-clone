import { useParams, Link, useNavigate } from "react-router-dom";

import products from "../data/products";
import { useCart } from "../context/CartContext";

import ProductGallery from "../components/ProductGallery/ProductGallery";
import ProductInfo from "../components/ProductInfo/ProductInfo";
import Reviews from "../components/Reviews/Reviews";

import "./ProductDetails.css";

function ProductDetails() {

  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const foundProduct = products.find(
    (item) => item.id === Number(id)
  );

  const product = foundProduct && {
    ...foundProduct,
    images: foundProduct.images?.length ? foundProduct.images : [foundProduct.image],
    description: foundProduct.description?.length
      ? foundProduct.description
      : [`Quality ${foundProduct.name} from ${foundProduct.brand}.`],
    reviews: foundProduct.reviews ?? 0,
    discount: foundProduct.discount ?? 0,
    oldPrice: foundProduct.oldPrice ?? foundProduct.price,
    stock: foundProduct.stock ?? (foundProduct.availability === "In Stock" ? 10 : 0),
    seller: foundProduct.seller ?? foundProduct.brand,
  };

  /* Product not found */

  if (!product) {
    return (
      <div className="product-not-found">

        <h1>Product not found</h1>

        <p>
          Sorry, we couldn't find that product.
        </p>

        <Link to="/">
          Continue shopping
        </Link>

      </div>
    );
  }

  /* Add to Cart */

  const handleAddToCart = (product, quantity) => {
    for (let index = 0; index < quantity; index += 1) {
      addToCart(product);
    }
    navigate("/cart");
  };

  /* Buy Now */

  const handleBuyNow = (product, quantity) => {

    const order = {
      ...product,
      quantity
    };

    localStorage.setItem(
      "buyNow",
      JSON.stringify(order)
    );
    navigate("/checkout");
  };

  return (
    <div className="product-details-page">

      {/* Breadcrumb */}

      <div className="breadcrumb">

        <Link to="/">
          Home
        </Link>

        <span> › </span>

        <span>{product.category}</span>

        <span> › </span>

        <span>{product.brand}</span>

      </div>

      {/* Main Product */}

      <main className="product-details-container">

        <div className="gallery-column">

          <ProductGallery
            images={product.images}
            productName={product.name}
          />

        </div>

        <div className="information-column">

          <ProductInfo
            product={product}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
          />

        </div>

      </main>

      {/* About Product */}

      <section className="about-product">

        <h2>About this item</h2>

        <ul>

          {product.description.map(
            (description, index) => (

              <li key={index}>
                {description}
              </li>

            )
          )}

        </ul>

      </section>

      {/* Customer Reviews */}

      <Reviews product={product} />

    </div>
  );
}

export default ProductDetails;