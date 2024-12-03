import { useEffect, useState } from "react";
import axios from "axios";
import Drawer from "./components/Drawer/Drawer";
import Header from "./components/Header";
import { Route, Routes } from "react-router";
import Home from "./components/pages/Home";
import Favorites from "./components/pages/Favorites";
import AppContext from "./context";
import Orders from "./components/pages/Orders";

export interface IArr {
  id: number;
  name: string;
  price: number;
  img: string;
  parentId?: number;
}

export default function App() {
  const [items, setItems] = useState<IArr[]>([]);
  const [cartItems, setCartItems] = useState<IArr[]>([]);
  const [favorites, setFavorites] = useState<IArr[]>(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  const [cartOpened, setCartOpened] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const itemsResponse = await axios.get(
          "https://6739f262a3a36b5a62f02ffd.mockapi.io/items"
        );

        const cartResponse = await axios.get(
          "https://6739f262a3a36b5a62f02ffd.mockapi.io/cart"
        );

        setIsLoading(false);

        setItems(itemsResponse.data);
        setCartItems(cartResponse.data);
      } catch (error) {
        alert("ошибка при запросе данных");
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  const onAddToCart = async (obj: IArr) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id)
      );
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(
          `https://6739f262a3a36b5a62f02ffd.mockapi.io/cart/${findItem.id}`
        );
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          "https://6739f262a3a36b5a62f02ffd.mockapi.io/cart",
          obj
        );
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
        );
      }
    } catch (error) {
      alert("Ошибка в добавлении товара");
    }
  };

  const onRemoveItem = (id: number) => {
    axios.delete(`https://6739f262a3a36b5a62f02ffd.mockapi.io/cart/${id}`);
    setCartItems((prev) =>
      prev.filter((item) => Number(item.id) !== Number(id))
    );
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

  const isAddedItems = (id: number) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isAddedItems,
        setCartOpened,

        setCartItems,
      }}
    >
      <div className="wrapper">
        <Drawer
          onRemove={onRemoveItem}
          items={cartItems}
          onClose={() => setCartOpened(false)}
          opened={cartOpened}
        />

        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                searchValue={searchValue}
                cartItems={cartItems}
                onChangeSearchInput={onChangeSearchInput}
                onToggleFavorite={onToggleFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          />

          <Route
            path="/favorite"
            element={
              <Favorites
                onToggleFavorite={onToggleFavorite}
                onAddToCart={onAddToCart}
              />
            }
          />

          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}
