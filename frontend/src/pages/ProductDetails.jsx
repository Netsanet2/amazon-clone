import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { getProductById } from "../services/productService";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

import ProductGallery from "../components/ProductGallery/ProductGallery";
import ProductInfo from "../components/ProductInfo/ProductInfo";
import Reviews from "../components/Reviews/Reviews";
import AuthPrompt from "../components/AuthPrompt/AuthPrompt";

import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showBuyNowPrompt, setShowBuyNowPrompt] = useState(false);
  const [showAddToCartPrompt, setShowAddToCartPrompt] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const foundProduct = await getProductById(id);

        if (!foundProduct) {
          setProduct(null);
          return;
        }

        const formattedProduct = {
          ...foundProduct,
          images: foundProduct.images?.length
            ? foundProduct.images
            : [foundProduct.image],

          description: foundProduct.description?.length
            ? foundProduct.description
            : [
                `Quality ${foundProduct.name} from ${foundProduct.brand}.`,
              ],

          reviews: foundProduct.reviews ?? 0,
          discount: foundProduct.discount ?? 0,
          oldPrice: foundProduct.oldPrice ?? foundProduct.price,

          stock:
            foundProduct.stock ??
            (foundProduct.availability === "In Stock" ? 10 : 0),

          seller: foundProduct.seller ?? foundProduct.brand,
        };

        setProduct(formattedProduct);
      } catch (error) {
        console.error("Error loading product:", error);
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

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

  const handleAddToCart = async (product, quantity) => {
    if (!user) {
      setShowAddToCartPrompt(true);
      return;
    }

    try {
      await addToCart(product, quantity);
      navigate("/cart");
    } catch (error) {
      console.error("Unable to add product to cart:", error);
    }
  };

  /* Buy Now */

  const handleBuyNow = (product, quantity) => {
    const order = {
      ...product,
      quantity,
    };

    localStorage.setItem(
      "buyNow",
      JSON.stringify(order)
    );

    if (!user) {
      setShowBuyNowPrompt(true);
      return;
    }

    navigate("/checkout", {
      state: { buyNow: true },
    });
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

      {showAddToCartPrompt && (
        <AuthPrompt
          modal
          title="Sign in to add this item to your cart"
          message="Please sign in to continue with your cart."
          destination={{ pathname: "/cart" }}
          onCancel={() => setShowAddToCartPrompt(false)}
        />
      )}

      {showBuyNowPrompt && (
        <AuthPrompt
          modal
          title="Sign in to continue with your purchase"
          message="Please sign in to continue with your purchase."
          destination={{
            pathname: "/checkout",
            state: { buyNow: true },
          }}
          onCancel={() => setShowBuyNowPrompt(false)}
        />
      )}

      {/* Customer Reviews */}

      <Reviews product={product} />

    </div>
  );
}

export default ProductDetails;