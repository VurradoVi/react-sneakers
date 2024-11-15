import styles from './Card.module.scss'

interface CardProps {
  name: string;
  price: number;
  img: string
}

export default function Card(props:CardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img src="/img/favorite.svg" alt="favorite" />
      </div>
      <img width={133} height={112} src={props.img} alt="sneakers" />
      <h5>{props.name}</h5>
      <div className={styles.cardBottom}>
        <div>
          <span>Цена:</span>
          <b>{props.price} руб.</b>
        </div>
        <button>
          <img width={11} height={11} src="/img/Vector.svg" alt="btn" />
        </button>
      </div>
    </div>
  );
}
