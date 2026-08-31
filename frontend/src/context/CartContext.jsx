import { createContext, useContext, useEffect, useState } from "react";

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

  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const increaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
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

  const moveToCart = (productId) => {
    const item = savedItems.find(
      (item) => item.id === productId
    );

    if (item) {
      setCartItems((currentItems) => [...currentItems, item]);

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