import { useEffect, useState } from "react";
import axios from "axios";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import { Route, Routes } from "react-router";
import Home from "./components/pages/Home";
import Favorites from "./components/pages/Favorites";

export interface IArr {
  id: number;
  name: string;
  price: number;
  img: string;
}

export default function App() {
  const [items, setItems] = useState<IArr[]>([]);
  const [cartItems, setCartItems] = useState<IArr[]>([]);
  const [favorites, setFavorites] = useState<IArr[]>(()=> {
    const storedFavorites = localStorage.getItem('favorites')
    return storedFavorites ? JSON.parse(storedFavorites) : []
  });
  const [cartOpened, setCartOpened] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    axios
      .get("https://6739f262a3a36b5a62f02ffd.mockapi.io/items")
      .then((res) => {
        setItems(res.data);
      });
    axios
      .get("https://6739f262a3a36b5a62f02ffd.mockapi.io/cart")
      .then((res) => {
        setCartItems(res.data);
      });
  }, []);

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  const onAddToCart = (obj: IArr) => {
    axios.post("https://6739f262a3a36b5a62f02ffd.mockapi.io/cart", obj);
    setCartItems((prev) => [...prev, obj]);
  };

  const onRemoveItem = (id: number) => {
    axios.delete(`https://6739f262a3a36b5a62f02ffd.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onToggleFavorite = (obj: IArr) => {
    const isAlreadyFavorite = favorites.some((item) => item.id === obj.id);
  
    if (isAlreadyFavorite) {
      setFavorites((prev) => {
        const updatedFavorites = prev.filter((item) => item.id !== obj.id);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        return updatedFavorites;
      });
    } else {
      setFavorites((prev) => {
        const updatedFavorites = [...prev, obj];
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        return updatedFavorites;
      });
    }
  };

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  return (
    <div className="wrapper">
      {cartOpened && (
        <Drawer
          onRemove={onRemoveItem}
          items={cartItems}
          onClose={() => setCartOpened(false)}
        />
      )}
      <Header onClickCart={() => setCartOpened(true)} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              items={items}
              searchValue={searchValue}
              onChangeSearchInput={onChangeSearchInput}
              onToggleFavorite={onToggleFavorite}
              onAddToCart={onAddToCart}
            />
          }
        />

        <Route
          path="/favorite"
          element={
            <Favorites
              onToggleFavorite={onToggleFavorite}
              onAddToCart={onAddToCart}
              favorites={favorites}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
}
