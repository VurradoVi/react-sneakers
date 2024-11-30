import { useContext, useState } from "react";
import { IArr } from "../App";
import Info from "./Info";
import AppContext from "../context";

type TDrawer = {
  onClose: () => void;
  items: IArr[];
  onRemove: (id: number) => void;
};

export default function Drawer({ onClose, items, onRemove }: TDrawer) {
  const [isComplete, setIsComplete] = useState(false)
  const {setCartItems} = useContext(AppContext)

  const onClickOrder = () => {
    setIsComplete(true)
    setCartItems([])
  }

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

        
        {items.length > 0 ? (
          <div className="drawerFlex">
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
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="/img/delete.svg"
                    alt="delete"
                  />
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
              <button onClick={onClickOrder} className="greenButton">
                Оформить заказ <img src="/img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            img={isComplete ? "./img/cartAccept.jpg" : "./img/cartBox.jpg" }
            title={isComplete ? "Заказ оформлен!" : "Корзина пустая"}
            description={isComplete ? `Ваш заказ #${Math.floor(Math.random() * 50) + 1} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
          />
        )}
      </div>
    </div>
  );
}
