import { useContext } from "react";
import { IArr } from "../../App";
import Card from "../Card/Card";
import AppContext from "../../context";

interface FavoritesProps {
  onToggleFavorite: (obj: IArr) => void;
  onAddToCart: (obj: IArr) => void;
}

export default function Favorites({
  onToggleFavorite,
  onAddToCart,
}: FavoritesProps) {
  const { favorites } = useContext(AppContext);
  return (
    <div className="content">
      <div className="content-search">
        <h1> Мои закладки</h1>
      </div>

      <div className="sneakersFlex">
        {favorites.length > 0 ? (
          favorites.map((s) => (
            <Card
              key={s.id}
              {...s}
              favorite={true}
              onClickFavorite={() => onToggleFavorite(s)}
              onPlus={(obj) => onAddToCart(obj)}
            />
          ))
        ) : (
          <p style={{ fontWeight: "bold" }}>Пусто</p>
        )}
      </div>
    </div>
  );
}
