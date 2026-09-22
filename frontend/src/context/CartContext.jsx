import { createContext, useContext, useEffect, useState } from "react";
import {
  addCartItem,
  getCartItems,
  updateCartItem,
  deleteCartItem,
  clearCart as clearFirebaseCart,
} from "../services/cartService";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [savedItems, setSavedItems] = useState([]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Load cart from Firebase
  useEffect(() => {
    const loadCart = async () => {
      try {
        const items = await getCartItems();
        setCartItems(items);
      } catch (error) {
        console.log("Firebase cart not loaded:", error.message);
      }
    };

    loadCart();
  }, []);

  const addToCart = async (product) => {
    try {
      const existingItem = cartItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        const newQuantity = existingItem.quantity + 1;

        await updateCartItem(product.id, {
          quantity: newQuantity,
        });

        setCartItems((currentItems) =>
          currentItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
      } else {
        const newItem = {
          ...product,
          quantity: 1,
        };

        await addCartItem(newItem);

        setCartItems((currentItems) => [
          ...currentItems,
          newItem,
        ]);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await deleteCartItem(productId);

      setCartItems((currentItems) =>
        currentItems.filter((item) => item.id !== productId)
      );
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      await updateCartItem(productId, {
        quantity: newQuantity,
      });

      setCartItems((currentItems) =>
        currentItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const clearCart = async () => {
    try {
      await clearFirebaseCart();
      setCartItems([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const increaseQuantity = async (productId) => {
    const item = cartItems.find(
      (item) => item.id === productId
    );

    if (!item) return;

    await updateQuantity(productId, item.quantity + 1);
  };

  const decreaseQuantity = async (productId) => {
    const item = cartItems.find(
      (item) => item.id === productId
    );

    if (!item || item.quantity <= 1) return;

    await updateQuantity(productId, item.quantity - 1);
  };

  const saveForLater = (productId) => {
    setCartItems((currentItems) => {
      const itemToSave = currentItems.find(
        (item) => item.id === productId
      );

      if (!itemToSave) return currentItems;

      setSavedItems((currentSavedItems) => [
        ...currentSavedItems,
        itemToSave,
      ]);

      return currentItems.filter(
        (item) => item.id !== productId
      );
    });
  };

  const moveToCart = async (productId) => {
    const item = savedItems.find(
      (item) => item.id === productId
    );

    if (item) {
      await addToCart(item);

      setSavedItems((currentItems) =>
        currentItems.filter((item) => item.id !== productId)
      );
    }
  };

  const getSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getCartCount = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        savedItems,
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
  return useContext(CartContext);
}