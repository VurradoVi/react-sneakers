import React, { createContext, useContext, useState } from "react";

interface CartContextType {
  cartOpened: boolean;
  setCartOpened: (value: boolean) => void;
}

const CartContext = createContext<CartContextType | null>(null);


export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartOpened, setCartOpened] = useState(false);

  return (
    <CartContext.Provider value={{ cartOpened, setCartOpened }}>
      {children}
    </CartContext.Provider>
  );
};
