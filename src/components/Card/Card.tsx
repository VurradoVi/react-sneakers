import { useState } from "react";
import styles from "./Card.module.scss";
import { IArr } from "../../App";

interface CardProps extends IArr {
  onClickFavorite: () => void;
  onPlus: (item: IArr) => void;
}

export default function Card({
  id,
  name,
  img,
  price,
  onClickFavorite,
  onPlus,
}: CardProps) {
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const onClickPlus = () => {
    onPlus({ id, name, img, price });
    setIsAdded(!isAdded);
  };


  const onFavorite = () => {
    setIsFavorite(!isFavorite)
  }
  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onClickFavorite}>
        <img onClick={onFavorite} src={isFavorite ? "/img/favorite2.svg" : "/img/favorite.svg"} alt="favorite" />
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
    </div>
  );
}
