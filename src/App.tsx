import { useState } from "react";
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
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Мужские Кроссовки Nike Blazer Mid Suede",
      price: 12999,
      img: "/img/sneakers/s1.jpg",
    },
    {
      id: 2,
      name: "Мужские Кроссовки Nike Air Max 270",
      price: 12999,
      img: "/img/sneakers/s2.jpg",
    },
    {
      id: 3,
      name: "Мужские Кроссовки Nike Blazer Mid Suede",
      price: 8499,
      img: "/img/sneakers/s3.jpg",
    },
    {
      id: 4,
      name: "Кроссовки Puma X Aka Boku Future Rider",
      price: 8999,
      img: "/img/sneakers/s4.jpg",
    },
    {
      id: 5,
      name: "Мужские Кроссовки Under Armour Curry 8",
      price: 15199,
      img: "/img/sneakers/s5.jpg",
    },
    {
      id: 6,
      name: "Мужские Кроссовки Nike Kyrie 7",
      price: 13199,
      img: "/img/sneakers/s6.jpg",
    },
    {
      id: 7,
      name: "Мужские Кроссовки Jordan Air Jordan 11",
      price: 10799,
      img: "/img/sneakers/s7.jpg",
    },
  ]);
  const [cartItems, setCartItems] = useState<IArr[]>([]);
  const [cartOpened, setCartOpened] = useState(false);

  const onAddToCart = (obj: IArr) => {
    setCartItems([...cartItems, obj]);
  };

  const onRemoveCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    
  };

  return (
    <div className="wrapper">
      {cartOpened && (
        <Drawer
          onRemove={onRemoveCart}
          items={cartItems}
          onClose={() => setCartOpened(false)}
        />
      )}

      <Header onClickCart={() => setCartOpened(true)} />

      <div className="content">
        <div className="content-search">
          <h1>Все кроссовки</h1>
          <div className="search-block">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." type="text" />
          </div>
        </div>

        <div className="sneakersFlex">
          {items.map((s) => (
            <Card
              id={s.id}
              key={s.id}
              name={s.name}
              price={s.price}
              img={s.img}
              onClickFavorite={() => console.log("Нажали на фаворите")}
              onPlus={(obj) => onAddToCart(obj)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
