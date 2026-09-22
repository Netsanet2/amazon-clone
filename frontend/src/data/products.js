const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 49.99,
    rating: 4.5,
    category: "Electronics",
    brand: "SoundMax",
    availability: "In Stock",
    dateAdded: "2026-09-10",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  },

  {
    id: 2,
    name: "Men's Casual Cotton Shirt",
    price: 29.99,
    rating: 4.2,
    category: "Fashion",
    brand: "UrbanStyle",
    availability: "In Stock",
    dateAdded: "2026-09-08",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
  },

  {
    id: 3,
    name: "Smart Watch Series 5",
    price: 89.99,
    rating: 4.7,
    category: "Watches",
    brand: "TechTime",
    availability: "In Stock",
    dateAdded: "2026-09-11",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },

  {
    id: 4,
    name: "Premium Face Moisturizer",
    price: 24.99,
    rating: 4.4,
    category: "Beauty",
    brand: "GlowCare",
    availability: "In Stock",
    dateAdded: "2026-09-06",
    image:
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8",
  },

  {
    id: 5,
    name: "Running Shoes",
    price: 64.99,
    rating: 4.6,
    category: "Fashion",
    brand: "SportPro",
    availability: "In Stock",
    dateAdded: "2026-09-09",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },

  {
    id: 6,
    name: "Laptop Backpack",
    price: 39.99,
    rating: 4.3,
    category: "Accessories",
    brand: "TravelGear",
    availability: "Out of Stock",
    dateAdded: "2026-09-05",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
  },

  {
    id: 7,
    name: "Wireless Computer Mouse",
    price: 19.99,
    rating: 4.1,
    category: "Electronics",
    brand: "TechPro",
    availability: "In Stock",
    dateAdded: "2026-09-07",
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db",
  },

  {
    id: 8,
    name: "Luxury Leather Watch",
    price: 149.99,
    rating: 4.8,
    category: "Luxury",
    brand: "EliteTime",
    availability: "In Stock",
    dateAdded: "2026-09-12",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d",
  },

  {
    id: 9,
    name: "Women's Summer Dress",
    price: 54.99,
    rating: 4.6,
    category: "Fashion",
    brand: "StyleHouse",
    availability: "In Stock",
    dateAdded: "2026-09-12",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8",
  },

  {
    id: 10,
    name: "Modern Sunglasses",
    price: 34.99,
    rating: 4.3,
    category: "Fashion",
    brand: "VisionPro",
    availability: "In Stock",
    dateAdded: "2026-09-11",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
  },

  {
    id: 11,
    name: "Wireless Portable Speaker",
    price: 59.99,
    rating: 4.5,
    category: "Electronics",
    brand: "SoundMax",
    availability: "In Stock",
    dateAdded: "2026-09-10",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
  },

  {
    id: 12,
    name: "Mechanical Gaming Keyboard",
    price: 79.99,
    rating: 4.7,
    category: "Electronics",
    brand: "TechPro",
    availability: "In Stock",
    dateAdded: "2026-09-09",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
  },

  {
    id: 13,
    name: "Luxury Perfume",
    price: 99.99,
    rating: 4.8,
    category: "Luxury",
    brand: "EliteBeauty",
    availability: "In Stock",
    dateAdded: "2026-09-12",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601",
  },

  {
    id: 14,
    name: "Face Care Beauty Set",
    price: 44.99,
    rating: 4.4,
    category: "Beauty",
    brand: "GlowCare",
    availability: "In Stock",
    dateAdded: "2026-09-08",
    image:
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908",
  },

  {
    id: 15,
    name: "Classic Leather Handbag",
    price: 74.99,
    rating: 4.6,
    category: "Accessories",
    brand: "StyleHouse",
    availability: "In Stock",
    dateAdded: "2026-09-10",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
  },

  {
    id: 16,
    name: "Premium Smart Phone",
    price: 699.99,
    rating: 4.8,
    category: "Electronics",
    brand: "TechPro",
    availability: "In Stock",
    dateAdded: "2026-09-12",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
  },

  {
    id: 17,
    name: "Kitchen Pressure Cooker",
    price: 89.99,
    rating: 4.5,
    category: "Kitchen",
    brand: "HomeChef",
    availability: "In Stock",
    dateAdded: "2026-09-13",
    image:
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7",
  },

  {
    id: 18,
    name: "Espresso Coffee Maker",
    price: 34.99,
    rating: 4.4,
    category: "Kitchen",
    brand: "BrewHouse",
    availability: "In Stock",
    dateAdded: "2026-09-13",
    image:
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6",
  },

  {
    id: 19,
    name: "Dinnerware Set",
    price: 45.99,
    rating: 4.3,
    category: "Kitchen",
    brand: "TableHome",
    availability: "In Stock",
    dateAdded: "2026-09-13",
    image:
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7",
  },

  {
    id: 20,
    name: "Kitchen Utensil Set",
    price: 19.99,
    rating: 4.2,
    category: "Kitchen",
    brand: "HomeChef",
    availability: "In Stock",
    dateAdded: "2026-09-13",
    image:
      "https://images.unsplash.com/photo-1506368249639-73a05d6f6488",
  },

  { id: 21, name: "Classic Blue Jeans", price: 19.99, rating: 4.3, category: "Fashion", brand: "DenimWorks", availability: "In Stock", dateAdded: "2026-09-13", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246" },
  { id: 22, name: "Everyday Cotton Top", price: 24.99, rating: 4.2, category: "Fashion", brand: "UrbanStyle", availability: "In Stock", dateAdded: "2026-09-13", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518" },
  { id: 23, name: "Women's Summer Dress", price: 29.99, rating: 4.5, category: "Fashion", brand: "StyleHouse", availability: "In Stock", dateAdded: "2026-09-13", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8" },
  { id: 24, name: "Everyday Running Shoes", price: 49.99, rating: 4.5, category: "Fashion", brand: "SportPro", availability: "In Stock", dateAdded: "2026-09-13", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff" },
  { id: 25, name: "Durable Laptop Backpack", price: 29.99, rating: 4.3, category: "Accessories", brand: "TravelGear", availability: "In Stock", dateAdded: "2026-09-13", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62" },
  { id: 26, name: "SoundMax Study Electronics", price: 49.99, rating: 4.4, category: "Electronics", brand: "SoundMax", availability: "In Stock", dateAdded: "2026-09-13", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b" },
  { id: 27, name: "Stationery Writing Set", price: 12.99, rating: 4.4, category: "Stationery", brand: "WriteRight", availability: "In Stock", dateAdded: "2026-09-13", image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd" },
  { id: 28, name: "Study Notebook Collection", price: 15.99, rating: 4.5, category: "Books", brand: "BrightPage", availability: "In Stock", dateAdded: "2026-09-13", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c" },
  { id: 29, name: "Gaming Console", price: 299.99, rating: 4.6, category: "Electronics", brand: "GameCore", availability: "In Stock", dateAdded: "2026-09-13", image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db" },
  { id: 30, name: "Gaming Headset", price: 59.99, rating: 4.5, category: "Electronics", brand: "SoundMax", availability: "In Stock", dateAdded: "2026-09-13", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b" },
  { id: 31, name: "144Hz Gaming Monitor", price: 199.99, rating: 4.5, category: "Electronics", brand: "ViewPro", availability: "In Stock", dateAdded: "2026-09-13", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf" },
  { id: 32, name: "Pro Gaming Mouse", price: 49.99, rating: 4.4, category: "Electronics", brand: "TechPro", availability: "In Stock", dateAdded: "2026-09-13", image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7" },
  { id: 33, name: "MacBook Pro 14", price: 1299.99, rating: 4.8, category: "Electronics", brand: "Apple", availability: "In Stock", dateAdded: "2026-09-13", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8" },
  { id: 34, name: "Classic Wrist Watch", price: 89.99, rating: 4.4, category: "Watches", brand: "TimeCraft", availability: "In Stock", dateAdded: "2026-09-13", image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d" },
  { id: 35, name: "Leather Handbag", price: 59.99, rating: 4.5, category: "Accessories", brand: "StyleHouse", availability: "In Stock", dateAdded: "2026-09-13", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3" },
  { id: 36, name: "UV Protection Eyewear", price: 29.99, rating: 4.3, category: "Fashion", brand: "VisionPro", availability: "In Stock", dateAdded: "2026-09-13", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083" },
  { id: 37, name: "Classic Baseball Hat", price: 19.99, rating: 4.2, category: "Fashion", brand: "UrbanStyle", availability: "In Stock", dateAdded: "2026-09-13", image: "https://images.unsplash.com/photo-1521369909029-2afed882baee" },
  { id: 38, name: "Ninja Blender", price: 89.99, rating: 4.6, category: "Home", brand: "Ninja", availability: "In Stock", dateAdded: "2026-09-13", image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b" },
  { id: 39, name: "Fiction Best Sellers", price: 14.99, rating: 4.4, category: "Books", brand: "BrightPage", availability: "In Stock", dateAdded: "2026-09-13", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f" },
  { id: 40, name: "Non-Fiction Top Reads", price: 19.99, rating: 4.5, category: "Books", brand: "BrightPage", availability: "In Stock", dateAdded: "2026-09-13", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794" },
  { id: 41, name: "Superhero Comics Collection", price: 9.99, rating: 4.3, category: "Books", brand: "PanelPress", availability: "In Stock", dateAdded: "2026-09-13", image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f" },
  { id: 42, name: "Kids Bedtime Stories", price: 11.99, rating: 4.4, category: "Books", brand: "BrightPage", availability: "In Stock", dateAdded: "2026-09-13", image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e" },
  { id: 43, name: "Nintendo Switch", price: 299.99, rating: 4.7, category: "Electronics", brand: "Nintendo", availability: "In Stock", dateAdded: "2026-09-13", image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e" },
  { id: 44, name: "Makeup Collection", price: 24.99, rating: 4.4, category: "Beauty", brand: "GlowCare", availability: "In Stock", dateAdded: "2026-09-13", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348" },
  { id: 45, name: "GlowCare Skincare Routine", price: 34.99, rating: 4.5, category: "Beauty", brand: "GlowCare", availability: "In Stock", dateAdded: "2026-09-13", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571" },
  { id: 46, name: "GlowCare Hair Care Set", price: 19.99, rating: 4.3, category: "Beauty", brand: "GlowCare", availability: "In Stock", dateAdded: "2026-09-13", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e" },
  { id: 47, name: "GlowCare Fragrance", price: 79.99, rating: 4.6, category: "Beauty", brand: "GlowCare", availability: "In Stock", dateAdded: "2026-09-13", image: "https://images.unsplash.com/photo-1541643600914-78b084683601" },
  { id: 48, name: "Spalding NBA Basketball", price: 39.99, rating: 4.5, category: "Sports", brand: "Spalding", availability: "In Stock", dateAdded: "2026-09-13", image: "https://images.unsplash.com/photo-1519861531473-9200262188bf" },
  { id: 49, name: "Premium Dog Food", price: 39.99, rating: 4.5, category: "Pets", brand: "PetCare", availability: "In Stock", dateAdded: "2026-09-13", image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee" },
  { id: 50, name: "Interactive Cat Toy", price: 14.99, rating: 4.4, category: "Pets", brand: "PetCare", availability: "In Stock", dateAdded: "2026-09-13", image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f" },
  { id: 51, name: "Comfortable Pet Bed", price: 49.99, rating: 4.5, category: "Pets", brand: "PetCare", availability: "In Stock", dateAdded: "2026-09-13", image: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0" },
  { id: 52, name: "Durable Pet Leash", price: 16.99, rating: 4.3, category: "Pets", brand: "PetCare", availability: "In Stock", dateAdded: "2026-09-13", image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1" },
  { id: 53, name: "Minimalist Silver Watch", price: 119.99, rating: 4.5, category: "Watches", brand: "TimeCraft", availability: "In Stock", dateAdded: "2026-09-14", image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d" },
  { id: 54, name: "Sport Digital Watch", price: 69.99, rating: 4.3, category: "Watches", brand: "ActiveTime", availability: "In Stock", dateAdded: "2026-09-14", image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade" },
  { id: 55, name: "Rose Gold Watch", price: 159.99, rating: 4.6, category: "Watches", brand: "EliteTime", availability: "In Stock", dateAdded: "2026-09-14", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49" },
  { id: 56, name: "Designer Leather Wallet", price: 89.99, rating: 4.5, category: "Luxury", brand: "EliteStyle", availability: "In Stock", dateAdded: "2026-09-14", image: "https://images.unsplash.com/photo-1627123424574-724758594e93" },
  { id: 57, name: "Luxury Silk Scarf", price: 129.99, rating: 4.4, category: "Luxury", brand: "EliteStyle", availability: "In Stock", dateAdded: "2026-09-14", image: "https://images.unsplash.com/photo-1601924928377-7f4d6b6e8d3c" },
  { id: 58, name: "Premium Gold Bracelet", price: 249.99, rating: 4.7, category: "Luxury", brand: "EliteStyle", availability: "In Stock", dateAdded: "2026-09-14", image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d" },
  { id: 59, name: "Everyday Travel Tote", price: 49.99, rating: 4.4, category: "Accessories", brand: "TravelGear", availability: "In Stock", dateAdded: "2026-09-14", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa" },
  { id: 60, name: "Nonstick Frying Pan", price: 39.99, rating: 4.5, category: "Kitchen", brand: "HomeChef", availability: "In Stock", dateAdded: "2026-09-14", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f" },
  { id: 61, name: "Modern Table Lamp", price: 39.99, rating: 4.4, category: "Home", brand: "HomeLiving", availability: "In Stock", dateAdded: "2026-09-14", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c" },
  { id: 62, name: "Decorative Throw Pillow", price: 24.99, rating: 4.3, category: "Home", brand: "HomeLiving", availability: "In Stock", dateAdded: "2026-09-14", image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2" },
  { id: 63, name: "Woven Storage Basket", price: 29.99, rating: 4.5, category: "Home", brand: "HomeLiving", availability: "In Stock", dateAdded: "2026-09-14", image: "https://images.unsplash.com/photo-1594620302200-9a762244a156" },
  { id: 64, name: "Soft Area Rug", price: 79.99, rating: 4.6, category: "Home", brand: "HomeLiving", availability: "In Stock", dateAdded: "2026-09-14", image: "https://images.unsplash.com/photo-1600166898405-da9535204843" },
  { id: 65, name: "Premium Ballpoint Pen Set", price: 9.99, rating: 4.4, category: "Stationery", brand: "WriteRight", availability: "In Stock", dateAdded: "2026-09-14", image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd" },
  { id: 66, name: "Hardcover Journal", price: 14.99, rating: 4.5, category: "Stationery", brand: "WriteRight", availability: "In Stock", dateAdded: "2026-09-14", image: "https://images.unsplash.com/photo-1511108690759-009324a90311" },
  { id: 67, name: "Desk Organizer", price: 18.99, rating: 4.3, category: "Stationery", brand: "WriteRight", availability: "In Stock", dateAdded: "2026-09-14", image: "https://images.unsplash.com/photo-1544816155-12df9643f363" },
  { id: 68, name: "Colored Pencil Kit", price: 12.99, rating: 4.6, category: "Stationery", brand: "WriteRight", availability: "In Stock", dateAdded: "2026-09-14", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f" },
  { id: 69, name: "Adjustable Dumbbells", price: 89.99, rating: 4.5, category: "Sports", brand: "ActivePro", availability: "In Stock", dateAdded: "2026-09-14", image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61" },
  { id: 70, name: "Yoga Exercise Mat", price: 29.99, rating: 4.6, category: "Sports", brand: "ActivePro", availability: "In Stock", dateAdded: "2026-09-14", image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f" },
  { id: 71, name: "Outdoor Hiking Bottle", price: 19.99, rating: 4.4, category: "Sports", brand: "TrailReady", availability: "In Stock", dateAdded: "2026-09-14", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8" },
  { id: 72, name: "Training Soccer Ball", price: 24.99, rating: 4.5, category: "Sports", brand: "ActivePro", availability: "In Stock", dateAdded: "2026-09-14", image: "https://images.unsplash.com/photo-1614632537190-23e4146777db" },
  { id: 73, name: "Natural Cat Treats", price: 11.99, rating: 4.4, category: "Pets", brand: "PetCare", availability: "In Stock", dateAdded: "2026-09-14", image: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4" },
];

export const productCategories = [
  "All",
  ...new Set(products.map((product) => product.category)),
];

export default products;