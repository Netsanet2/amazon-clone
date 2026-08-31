import { useCart } from "../../context/CartContext";
import headphoneImage from "../../assets/wireless-headphones.jpg";

function Products() {
  const { addToCart } = useCart();

 const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 50,
    seller: "Amazon Seller",
    stock: "In Stock",
    delivery: "FREE delivery",
    image: headphoneImage,
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 80,
    seller: "Tech Store",
    stock: "In Stock",
    delivery: "FREE delivery",
    image: headphoneImage,
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 45,
    seller: "Electro Store",
    stock: "In Stock",
    delivery: "FREE delivery",
    image: headphoneImage,
  },
  {
    id: 4,
    name: "USB-C Charger",
    price: 25,
    seller: "Tech Store",
    stock: "In Stock",
    delivery: "FREE delivery",
    image: headphoneImage,
  },
  {
    id: 5,
    name: "Laptop",
    price: 650,
    seller: "Computer Store",
    stock: "In Stock",
    delivery: "FREE delivery",
    image: headphoneImage,
  },
  {
    id: 6,
    name: "Smartphone",
    price: 400,
    seller: "Mobile Store",
    stock: "In Stock",
    delivery: "FREE delivery",
    image: headphoneImage,
  },
  {
    id: 7,
    name: "Wireless Mouse",
    price: 30,
    seller: "Tech Store",
    stock: "In Stock",
    delivery: "FREE delivery",
    image: headphoneImage,
  },
  {
    id: 8,
    name: "Mechanical Keyboard",
    price: 70,
    seller: "Computer Store",
    stock: "In Stock",
    delivery: "FREE delivery",
    image: headphoneImage,
  },
  {
    id: 9,
    name: "Power Bank",
    price: 35,
    seller: "Electro Store",
    stock: "In Stock",
    delivery: "FREE delivery",
    image: headphoneImage,
  },
  {
    id: 10,
    name: "USB Flash Drive",
    price: 15,
    seller: "Tech Store",
    stock: "In Stock",
    delivery: "FREE delivery",
    image: headphoneImage,
  },
  {
    id: 11,
    name: "Backpack",
    price: 40,
    seller: "Fashion Store",
    stock: "In Stock",
    delivery: "FREE delivery",
    image: headphoneImage,
  },
  {
    id: 12,
    name: "Running Shoes",
    price: 90,
    seller: "Sport Store",
    stock: "In Stock",
    delivery: "FREE delivery",
    image: headphoneImage,
  },
  {
    id: 13,
    name: "Smart TV",
    price: 550,
    seller: "Home Electronics",
    stock: "In Stock",
    delivery: "FREE delivery",
    image: headphoneImage,
  },
  {
    id: 14,
    name: "Coffee Maker",
    price: 75,
    seller: "Home Store",
    stock: "In Stock",
    delivery: "FREE delivery",
    image: headphoneImage,
  },
  {
    id: 15,
    name: "Blender",
    price: 60,
    seller: "Home Store",
    stock: "In Stock",
    delivery: "FREE delivery",
    image: headphoneImage,
  },
  {
    id: 16,
    name: "Perfume",
    price: 55,
    seller: "Beauty Store",
    stock: "In Stock",
    delivery: "FREE delivery",
    image: headphoneImage,
  },
  {
    id: 17,
    name: "Handbag",
    price: 85,
    seller: "Fashion Store",
    stock: "In Stock",
    delivery: "FREE delivery",
    image: headphoneImage,
  },
  {
    id: 18,
    name: "Sunglasses",
    price: 35,
    seller: "Fashion Store",
    stock: "In Stock",
    delivery: "FREE delivery",
    image: headphoneImage,
  },
];

  return (
    <div className="min-h-screen bg-[#eaeded] py-8">
      <div className="mx-auto max-w-7xl px-4">

        <h1 className="mb-2 text-3xl font-medium text-gray-900">
          Products
        </h1>

        <p className="mb-8 text-gray-600">
          Shop quality products at great prices.
        </p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col rounded-lg bg-white p-4 shadow-sm hover:shadow-lg"
            >

              <div className="flex h-52 items-center justify-center rounded-lg bg-gray-50 p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-contain"
                />
              </div>

              <h2 className="mt-4 text-lg font-medium text-gray-900">
                {product.name}
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                Sold by: {product.seller}
              </p>

              <p className="mt-2 text-sm font-medium text-green-700">
                ✓ {product.stock}
              </p>

              <p className="mt-1 text-sm text-gray-600">
                🚚 {product.delivery}
              </p>

              <p className="mt-3 text-2xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </p>

              <button
                type="button"
                onClick={() => {
  console.log("BUTTON CLICKED:", product);
  alert("Button is working!");
  addToCart(product);
}}
                className="mt-4 w-full rounded-full bg-[#ffd814] px-4 py-2.5 font-medium text-gray-900 hover:bg-[#f7ca00]"
              >
                Add to Cart
              </button>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Products;