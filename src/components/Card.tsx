import React from "react";

interface CardProps {
  name: string;
  price: number;
  img: string
}

export default function Card(props:CardProps) {
  return (
    <div className="card">
      <div className="favorite">
        <img src="/img/favorite.svg" alt="favorite" />
      </div>
      <img width={133} height={112} src={props.img} alt="sneakers" />
      <h5>{props.name}</h5>
      <div className="cardBottom">
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
