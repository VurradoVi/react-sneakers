import { useState } from "react";
import styles from "./Card.module.scss";
import { IArr } from "../../App";
import ContentLoader from "react-content-loader";

interface CardProps extends IArr {
  onClickFavorite: () => void;
  onPlus: (item: IArr) => void;
  favorite: boolean;
  added: boolean;
  loading: boolean;
}

export default function Card({
  id,
  name,
  img,
  price,
  onClickFavorite,
  onPlus,
  favorite = false,
  added = false,
  loading = false,
}: CardProps) {
  const [isAdded, setIsAdded] = useState<boolean>(added);
  const [isFavorite, setIsFavorite] = useState<boolean>(favorite);

  const onClickPlus = () => {
    onPlus({ id, name, img, price });
    setIsAdded(!isAdded);
  };

  const onFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={150}
          height={205}
          viewBox="0 0 150 187"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="105" rx="4" ry="4" width="150" height="15" />
          <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
          <rect x="0" y="128" rx="4" ry="4" width="93" height="15" />
          <rect x="0" y="160" rx="4" ry="4" width="80" height="24" />
          <rect x="117" y="155" rx="8" ry="8" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.favorite} onClick={onClickFavorite}>
            <img
              onClick={onFavorite}
              src={isFavorite ? "/img/favorite2.svg" : "/img/favorite.svg"}
              alt="favorite"
            />
          </div>
          <img width={133} height={112} src={img} alt="sneakers" />
          <h5>{name}</h5>
          <div className={styles.cardBottom}>
            <div>
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            <img
              onClick={onClickPlus}
              src={isAdded ? "/img/PlusSub.svg" : "/img/Plus.svg"}
              alt="btn"
            />
          </div>
        </>
      )}
    </div>
  );
}
