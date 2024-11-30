import { useContext } from 'react';
import AppContext from '../context';
interface InfoProps {
  img: string;
  title: string;
  description: string;
}

export default function Info({img, title, description}: InfoProps) {
  const {setCartOpened} = useContext(AppContext)
  return (
    <div className="cartEmpty">
      <img
        style={{ marginBottom: 20 }}
        width={120}
        src={img}
        alt="box"
      />
      <h2>{title}</h2>
      <p style={{opacity: 0.6}}>{description}</p>
      <button onClick={() => setCartOpened(false)} className="greenButton">
        <img src="/img/arrow.svg" alt="arrow" />
        Вернуться назад
      </button>
    </div>
  );
}
