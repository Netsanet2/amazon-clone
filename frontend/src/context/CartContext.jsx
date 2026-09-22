import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  addCartItem,
  getCartItems,
  updateCartItem,
  deleteCartItem,
  clearCart as clearFirebaseCart,
} from "../services/cartService";

import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user, loading: authLoading } = useAuth();

  const [cartItems, setCartItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);

  const normalizeId = (value) => String(value ?? "");

  const resetCartState = () => {
    setCartItems([]);
    setSavedItems([]);
    setCartLoading(false);
  };

  // Load the current user's cart after Firebase authentication is ready.
  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      resetCartState();
      return;
    }

    const loadCart = async () => {
      setCartLoading(true);

      try {
        const items = await getCartItems();
        setCartItems(items);
      } catch (error) {
        console.error(
          "Firebase cart could not be loaded:",
          error
        );

        setCartItems([]);
      } finally {
        setCartLoading(false);
      }
    };

    loadCart();
  }, [user, authLoading]);

  // Add a product to the cart.
  const addToCart = async (product, quantity = 1) => {
    if (!user) {
      throw new Error("Please log in before adding items to the cart.");
    }

    try {
      const productId = normalizeId(product.id);
      const quantityToAdd = Math.max(1, Number(quantity) || 1);
      const existingItem = cartItems.find(
        (item) => normalizeId(item.id) === productId
      );

      if (existingItem) {
        const newQuantity =
          Number(existingItem.quantity) + quantityToAdd;

        await updateCartItem(productId, {
          quantity: newQuantity,
        });

        setCartItems((currentItems) =>
          currentItems.map((item) =>
            normalizeId(item.id) === productId
              ? {
                  ...item,
                  id: productId,
                  productId,
                  quantity: newQuantity,
                }
              : item
          )
        );
      } else {
        const newItem = {
          ...product,
          id: productId,
          productId,
          quantity: quantityToAdd,
        };

        const savedItem = await addCartItem(newItem);

        setCartItems((currentItems) => [
          ...currentItems,
          {
            ...savedItem,
            id: normalizeId(savedItem.id ?? productId),
            productId: normalizeId(savedItem.productId ?? productId),
          },
        ]);
      }
    } catch (error) {
      console.error(
        "Error adding item to cart:",
        error
      );
      throw error;
    }
  };

  // Remove an item from the cart.
  const removeFromCart = async (productId) => {
    if (!user) return;

    const normalizedProductId = normalizeId(productId);

    try {
      await deleteCartItem(normalizedProductId);

      setCartItems((currentItems) =>
        currentItems.filter(
          (item) => normalizeId(item.id) !== normalizedProductId
        )
      );
    } catch (error) {
      console.error(
        "Error removing item from cart:",
        error
      );
    }
  };

  // Set a specific quantity.
  const updateQuantity = async (
    productId,
    newQuantity
  ) => {
    if (!user) return;

    const normalizedProductId = normalizeId(productId);
    const quantity = Number(newQuantity);

    if (!Number.isInteger(quantity) || quantity < 1) {
      return;
    }

    try {
      await updateCartItem(normalizedProductId, {
        quantity,
      });

      setCartItems((currentItems) =>
        currentItems.map((item) =>
          normalizeId(item.id) === normalizedProductId
            ? {
                ...item,
                id: normalizedProductId,
                productId: normalizedProductId,
                quantity,
              }
            : item
        )
      );
    } catch (error) {
      console.error(
        "Error updating cart quantity:",
        error
      );
    }
  };

  // Increase quantity by one.
  const increaseQuantity = async (productId) => {
    const item = cartItems.find(
      (item) => normalizeId(item.id) === normalizeId(productId)
    );

    if (!item) return;

    await updateQuantity(
      productId,
      Number(item.quantity) + 1
    );
  };

  // Decrease quantity by one.
  const decreaseQuantity = async (productId) => {
    const item = cartItems.find(
      (item) => normalizeId(item.id) === normalizeId(productId)
    );

    if (!item || Number(item.quantity) <= 1) {
      return;
    }

    await updateQuantity(
      productId,
      Number(item.quantity) - 1
    );
  };

  // Remove all items from the current user's Firebase cart.
  const clearCart = async () => {
    if (!user) return;

    try {
      await clearFirebaseCart();
      setCartItems([]);
    } catch (error) {
      console.error(
        "Error clearing cart:",
        error
      );
    }
  };

  // Save an item for later.
  // This currently exists only in React state.
  const saveForLater = (productId) => {
    if (!user) return;

    const normalizedProductId = normalizeId(productId);

    setCartItems((currentItems) => {
      const itemToSave = currentItems.find(
        (item) => normalizeId(item.id) === normalizedProductId
      );

      if (!itemToSave) {
        return currentItems;
      }

      setSavedItems((currentSavedItems) => {
        const alreadySaved = currentSavedItems.some(
          (item) => normalizeId(item.id) === normalizedProductId
        );

        if (alreadySaved) {
          return currentSavedItems;
        }

        return [
          ...currentSavedItems,
          {
            ...itemToSave,
            id: normalizedProductId,
            productId: normalizedProductId,
          },
        ];
      });

      return currentItems.filter(
        (item) => normalizeId(item.id) !== normalizedProductId
      );
    });
  };

  // Move a saved item back to the Firebase cart.
  const moveToCart = async (productId) => {
    if (!user) return;

    const normalizedProductId = normalizeId(productId);
    const item = savedItems.find(
      (savedItem) => normalizeId(savedItem.id) === normalizedProductId
    );

    if (!item) return;

    try {
      await addToCart(item);

      setSavedItems((currentItems) =>
        currentItems.filter(
          (savedItem) =>
            normalizeId(savedItem.id) !== normalizedProductId
        )
      );
    } catch (error) {
      console.error(
        "Error moving item to cart:",
        error
      );
    }
  };

  // Calculate cart subtotal.
  const getSubtotal = () => {
    return cartItems.reduce(
      (total, item) =>
        total +
        Number(item.price) *
          Number(item.quantity || 0),
      0
    );
  };

  // Calculate total number of products in cart.
  const getCartCount = () => {
    return cartItems.reduce(
      (total, item) =>
        total + Number(item.quantity || 0),
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        savedItems,
        cartLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        increaseQuantity,
        decreaseQuantity,
        saveForLater,
        moveToCart,
        getSubtotal,
        getCartCount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside a CartProvider"
    );
  }

  return context;
}
