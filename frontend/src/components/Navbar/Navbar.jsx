import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function Navbar() {
  const { getCartCount } = useCart();

  const cartCount = getCartCount();

  return (
    <nav className="bg-[#131921] px-6 py-4 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between">

        <Link
          to="/"
          className="text-2xl font-bold"
        >
          Amazon Clone
        </Link>

        <Link
          to="/cart"
          className="relative flex items-center gap-2 rounded px-3 py-2 hover:bg-gray-700"
        >
          <span className="text-2xl">🛒</span>

          <span className="font-medium">
            Cart
          </span>

          {cartCount > 0 && (
            <span className="absolute -right-1 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#f08804] px-1 text-xs font-bold text-black">
              {cartCount}
            </span>
          )}

        </Link>

      </div>
    </nav>
  );
}

export default Navbar;