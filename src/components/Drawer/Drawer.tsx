import { useState } from "react";
import { IArr } from "../../App";
import Info from "../Info";
import styles from './Drawer.module.scss'
import { useCart } from "../../hooks/useCart";
import axios from "axios";


type TDrawer = {
  onClose: () => void;
  items: IArr[];
  onRemove: (id: number) => void;
  opened: boolean
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Drawer({ onClose, items, onRemove, opened }: TDrawer) {
  const {cartItems, setCartItems, totalPrice} = useCart()
  const [isComplete, setIsComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("http://localhost:3000/orders", {
        items: cartItems,
      });
      setOrderId(data.id);
      setIsComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete("https://6739f262a3a36b5a62f02ffd.mockapi.io/cart/" + item.id);
        await delay(1000);
      }
    } catch (error) {
      alert("ошибка с оформлением товара db.json");
      console.log('json-server --watch db.json')
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`} onClick={onClose}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
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
          <div className={styles.drawerFlex}>
            <div className={styles.items}>
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
                  <b>{totalPrice} руб.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{((totalPrice / 100) * 5).toFixed(2)} руб.</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="greenButton"
              >
                Оформить заказ <img src="/img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            img={isComplete ? "./img/cartAccept.jpg" : "./img/cartBox.jpg"}
            title={isComplete ? "Заказ оформлен!" : "Корзина пустая"}
            description={
              isComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
          />
        )}
      </div>
    </div>
  );
}
