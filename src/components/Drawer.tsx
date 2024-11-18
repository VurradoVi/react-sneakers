import { IArr } from "../App";

type TDrawer = {
  onClose: () => void,
  items: IArr[],
  onRemove: (id:number) => void
}

export default function Drawer({ onClose, items, onRemove }: TDrawer) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        <h2>
          Корзина
          <img
            onClick={onClose}
            className="removeBtn"
            src="/img/delete.svg"
            alt="delete"
          />
        </h2>

        <div className="items">
          {items.map((obj) => (
            <div key={obj.id} className="cartItem">
              <div
                style={{ backgroundImage: `url(${obj.img})` }}
                className="cartItemImg"
              ></div>
              <div>
                <p>{obj.name}</p>
                <b>{obj.price} руб.</b>
              </div>
              <img onClick={() => onRemove(obj.id)} className="removeBtn" src="/img/delete.svg" alt="delete" />
            </div>
          ))}
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
