import { useState } from "react";
import styles from "./Card.module.scss";

interface CardProps {
  name: string;
  price: number;
  img: string;
  onClickFavorite: () => void;
  onClickPlus: () => void;
}

export default function Card(props: CardProps) {
  const [isAdded, setIsAdded] = useState<Boolean>(false);

  const onClickPlus = () => {
    setIsAdded(!isAdded);
  };
  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={props.onClickFavorite}>
        <img src="/img/favorite.svg" alt="favorite" />
      </div>
      <img width={133} height={112} src={props.img} alt="sneakers" />
      <h5>{props.name}</h5>
      <div className={styles.cardBottom}>
        <div>
          <span>Цена:</span>
          <b>{props.price} руб.</b>
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
