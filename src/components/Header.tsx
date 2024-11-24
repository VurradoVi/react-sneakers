import { Link } from "react-router";

export default function Header({ onClickCart }: { onClickCart: () => void }) {
  return (
    <header>
      <Link to="/">
      <div className="headerLeft">
        <img width={40} height={40} src="/img/logo.png" />
        <div className="headerInfo">
          <h3>React Sneakers</h3>
          <p>Магазин лучших кроссовок</p>
        </div>
      </div>
      </Link>
      <ul className="headerRight">
        <li onClick={onClickCart}>
          <img width={18} height={18} src="/img/trash.svg" alt="корзина" />
          <span>1205 руб.</span>
        </li>
        <li>
          <Link to="/favorite">
            <img width={18} height={18} src="/img/favor.svg" alt="закладки" />
          </Link>
        </li>
        <li>
          <img width={18} height={18} src="/img/User.svg" alt="пользователь" />
        </li>
      </ul>
    </header>
  );
}
