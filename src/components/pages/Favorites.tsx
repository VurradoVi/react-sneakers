import { IArr } from "../../App";
import Card from "../Card/Card";

interface FavoritesProps {
  favorites: IArr[];
  onToggleFavorite: (obj: IArr) => void;
  onAddToCart: (obj: IArr) => void;
}

export default function Favorites({
  favorites,
  onToggleFavorite,
  onAddToCart,
}: FavoritesProps) {
  return (
    <div className="content">
      <div className="content-search">
        <h1> Мои закладки</h1>
      </div>

      <div className="sneakersFlex">
      {favorites.length > 0 ? (
          favorites.map((s) => (
            <Card
              {...s}
              favorite={true}
              onClickFavorite={() => onToggleFavorite(s)}
            onPlus={(obj) => onAddToCart(obj)}
            />
          ))
        ) : (
          <p style={{fontWeight: 'bold'}}>Пусто</p>
        )}
      </div>
    </div>
  );
}
