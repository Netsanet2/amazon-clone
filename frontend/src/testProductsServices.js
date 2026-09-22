import {
  getProducts,
  getProductById,
} from "./services/productService";

const testProductService = async () => {
  try {
    console.log("Testing getProducts...");

    const products = await getProducts();

    console.log("Products from Firebase:", products);

    if (products.length > 0) {
      console.log("Testing getProductById...");

      const product = await getProductById(products[0].id);

      console.log("Product by ID:", product);
    } else {
      console.log("No products found in Firebase.");
    }
  } catch (error) {
    console.error("Product service test failed:", error);
  }
};

testProductService();