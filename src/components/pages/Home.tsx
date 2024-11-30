import { IArr } from "../../App";
import Card from "../Card/Card";

interface HomeProps {
  items: IArr[];
  cartItems: IArr[];
  searchValue: string;
  onToggleFavorite: (obj: IArr) => void;
  onChangeSearchInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddToCart: (obj: IArr) => void;
  isLoading: boolean;
}

export default function Home({
  items,
  searchValue,
  onToggleFavorite,
  onChangeSearchInput,
  onAddToCart,
  isLoading,
}: HomeProps) {

  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isLoading ? [...Array(8)] : filteredItems).map((s, index) => (
      <Card
        key={index}
        {...s}
        favorite={false}
        onClickFavorite={() => onToggleFavorite(s)}
        onPlus={(obj) => onAddToCart(obj)}
        loading={isLoading}
      />
    ));
  };

  return (
    <div className="content">
      <div className="content-search">
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}
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

      <div className="sneakersFlex">{renderItems()}</div>
    </div>
  );
}
