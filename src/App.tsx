import Card from "./components/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";

interface IArr {
  name: string,
  price: number
  img: string
}

const arr: IArr[] = [
  {
    name: 'Мужские Кроссовки Nike Blazer Mid Suede',
    price: 12999,
    img: '/img/sneakers/s1.jpg'
  },
  {
    name: 'Мужские Кроссовки Nike Air Max 270',
    price: 12999,
    img: '/img/sneakers/s2.jpg'
  },
  {
    name: 'Мужские Кроссовки Nike Blazer Mid Suede',
    price: 8499,
    img: '/img/sneakers/s3.jpg'
  }
]

function App() {
  return (
    <div className="wrapper">
      <Drawer />

      <Header />

      <div className="content">
        <div className="content-search">
          <h1>Все кроссовки</h1>
          <div className="search-block">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." type="text" />
          </div>
        </div>

        <div className="sneakersFlex">
          {arr.map((s, i) => <Card key={i} name={s.name} price={s.price} img={s.img} />)}
        </div>
      </div>
    </div>
  );
}

export default App;
