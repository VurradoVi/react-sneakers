import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./components/Card/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";

export interface IArr {
  id: number;
  name: string;
  price: number;
  img: string;
}

function App() {
  const [items, setItems] = useState<IArr[]>([]);
  const [cartItems, setCartItems] = useState<IArr[]>([]);
  const [favorites, setFavorites] = useState<IArr[]>([]);
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
        console.log(res.data)
      });
  }, []);

  const onAddToCart = (obj: IArr) => {
    axios.post("https://6739f262a3a36b5a62f02ffd.mockapi.io/cart", obj);
    setCartItems((prev) => [...prev, obj]);
  };

  const onRemoveItem = (id:number) => {
    axios.delete(`https://6739f262a3a36b5a62f02ffd.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id !== id));
  };

  const onToggleFavorite = (obj: IArr) => {
    const isAlreadyFavorite = favorites.some((item) => item.id === obj.id);
    
    if (isAlreadyFavorite) {
      // Удаляем из избранного
      setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
    } else {
      // Добавляем в избранное
      setFavorites((prev) => [...prev, obj]);
    }
    console.log(favorites)
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

      <div className="content">
        <div className="content-search">
          <h1>
            {searchValue
              ? `Поиск по запросу: "${searchValue}"`
              : "Все кроссовки"}
          </h1>
          <div className="search-block">
            <img src="/img/search.svg" alt="Search" />
            <input
              value={searchValue}
              onChange={onChangeSearchInput}
              placeholder="Поиск..."
              type="text"
            />
          </div>
        </div>

        <div className="sneakersFlex">
          {items
            .filter((item) =>
              item.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((s) => (
              <Card
                id={s.id}
                key={s.id}
                name={s.name}
                price={s.price}
                img={s.img}
                onClickFavorite={() => onToggleFavorite(s)}
                onPlus={(obj) => onAddToCart(obj)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
