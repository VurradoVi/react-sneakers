import React from "react";

export default function Drawer() {
  return (
    <div style={{ display: "none" }} className="overlay">
      <div className="drawer">
        <h2>
          Корзина
          <img className="removeBtn" src="/img/delete.svg" alt="delete" />
        </h2>

        <div className="items">
          <div className="cartItem">
            <div
              style={{ backgroundImage: "url(/img/sneakers/s1.jpg)" }}
              className="cartItemImg"
            ></div>
            <div>
              <p>Мужские Кроссовки Nike Blazer Mid Suede</p>
              <b>12 999 руб.</b>
            </div>
            <img className="removeBtn" src="/img/delete.svg" alt="delete" />
          </div>
        </div>

        <div className="sideFooter">
          <ul>
            <li>
              <span>Итого:</span>
              <div></div>
              <b>21 498 руб.</b>
            </li>
            <li>
              <span>Налог 5%:</span>
              <div></div>
              <b>1074 руб.</b>
            </li>
          </ul>
          <button className="greenButton">
            Оформить заказ <img src="/img/arrow.svg" alt="arrow" />
          </button>
        </div>
      </div>
    </div>
  );
}
