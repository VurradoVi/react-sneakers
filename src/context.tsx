import { createContext } from "react";
import { IArr } from "./App";

interface AppContextType {
  favorites: IArr[];
  items: IArr[]; 
  cartItems: IArr[]; 
  isAddedItems: (id: number) => boolean;
  setCartOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setCartItems: React.Dispatch<React.SetStateAction<IArr[]>>;

}

const defaultValue: AppContextType = {
  favorites: [],
  items: [], 
  cartItems: [], 
  isAddedItems: () => false,
  setCartOpened: () => false,
  setCartItems: () => false,

};

const AppContext = createContext<AppContextType>(defaultValue);

export default AppContext