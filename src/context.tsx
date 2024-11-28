import { createContext } from "react";
import { IArr } from "./App";

interface AppContextType {
    favorites: IArr[];

  }

const defaultValue: AppContextType = {
  favorites: [], // Значение по умолчанию
};

const AppContext = createContext<AppContextType>(defaultValue);

export default AppContext