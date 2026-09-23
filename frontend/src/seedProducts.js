import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "./firebase.js";
import products from "./data/products.js";

const seedProducts = async () => {
  try {
    console.log("Starting product upload...");

    for (const product of products) {
      const productRef = doc(
        collection(db, "products"),
        String(product.id)
      );

      await setDoc(productRef, {
        ...product,
        id: String(product.id),
      });

      console.log(`Uploaded product ${product.id}: ${product.name}`);
    }

    console.log("✅ All 73 products uploaded successfully!");
  } catch (error) {
    console.error("❌ Error uploading products:", error);
  }
};

seedProducts();