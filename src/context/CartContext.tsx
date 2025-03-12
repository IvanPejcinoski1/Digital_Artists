import React, { createContext, useState, useEffect, ReactNode } from "react";
import { Product } from "src/types/types";

interface Props {
  children: ReactNode;
}

interface ContextData {
  addedToCart: Product[];
  setAddedToCart: React.Dispatch<React.SetStateAction<Product[]>>;
  removeFromCart: (productId: string) => void;
  totalAmount: number;
}

export const CartContext = createContext({} as ContextData);

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [addedToCart, setAddedToCart] = useState<Product[]>([]);

  const removeFromCart = (productId: string) => {
    setAddedToCart((prevCart) =>
      prevCart.filter((item) => item.id !== productId)
    );
  };
  const totalAmount = addedToCart.reduce(
    (total, product) => total + product.price,
    0
  );

  useEffect(() => {
    // Add any initialization logic here if needed
  }, []);

  return (
    <CartContext.Provider
      value={{ addedToCart, setAddedToCart, removeFromCart, totalAmount }}
    >
      {children}
    </CartContext.Provider>
  );
};
