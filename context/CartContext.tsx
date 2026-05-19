"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type CartItem = {
  id: string;
  title: string;
  author: string;
  price: number;
  qty: number;
  category: string;
};

type CartContextType = {
  cart: CartItem[];

  addToCart: (item: CartItem) => void;

  removeFromCart: (id: string) => void;

  updateQuantity: (
    id: string,
    qty: number
  ) => void;

  clearCart: () => void;
};

const CartContext =
  createContext<CartContextType | null>(
    null
  );

export const CartProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cart, setCart] = useState<
    CartItem[]
  >([]);

  // LOAD FROM LOCALSTORAGE
  useEffect(() => {
    const storedCart =
      localStorage.getItem("cart");

    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // SAVE TO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  // ADD TO CART
  const addToCart = (
    item: CartItem
  ) => {
    setCart((prev) => {
      const existing = prev.find(
        (p) => p.id === item.id
      );

      if (existing) {
        return prev.map((p) =>
          p.id === item.id
            ? {
                ...p,
                qty: p.qty + 1,
              }
            : p
        );
      }

      return [...prev, item];
    });
  };

  // REMOVE ITEM
  const removeFromCart = (
    id: string
  ) => {
    setCart((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // UPDATE QUANTITY
  const updateQuantity = (
    id: string,
    qty: number
  ) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              qty,
            }
          : item
      )
    );
  };

  // CLEAR CART
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
};