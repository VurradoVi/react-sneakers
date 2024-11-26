import { IArr } from "../../App";
import Card from "../Card/Card";

interface HomeProps {
    items: IArr[];
    searchValue: string;
    onToggleFavorite: (obj: IArr) => void;
    onChangeSearchInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onAddToCart: (obj: IArr) => void;
  }

export default function Home({items, searchValue, onToggleFavorite, onChangeSearchInput, onAddToCart}: HomeProps) {
  return (
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
                favorite={false}
                onClickFavorite={() => onToggleFavorite(s)}
                onPlus={(obj) => onAddToCart(obj)}
              />
            ))}
        </div>
      </div>
  )
}
