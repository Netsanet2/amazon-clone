import { useState } from "react";
import "./ProductGallery.css";

function ProductGallery({ images, productName }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="product-gallery">

      {/* Thumbnail Images */}
      <div className="thumbnail-container">
        {images.map((image, index) => (
          <button
            key={index}
            className={`thumbnail ${
              currentIndex === index ? "thumbnail-active" : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            <img
              src={image}
              alt={`${productName} thumbnail ${index + 1}`}
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="main-image-container">

        <button
          className="gallery-button gallery-prev"
          onClick={previousImage}
          aria-label="Previous image"
        >
          ❮
        </button>

        <img
          className="main-product-image"
          src={images[currentIndex]}
          alt={productName}
        />

        <button
          className="gallery-button gallery-next"
          onClick={nextImage}
          aria-label="Next image"
        >
          ❯
        </button>

      </div>

    </div>
  );
}

export default ProductGallery;