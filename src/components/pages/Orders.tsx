import { useEffect, useState } from "react";
import Card from "../Card/Card";
import axios from "axios";
import { IArr } from "../../App";


export default function Orders() {
  const [orders, setOrders] = useState<IArr[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/orders");

        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert('ошибка с загрузкой моих заказов')
      }
    })();
  }, []);

  return (
    <div className="content">
      <div className="content-search">
        <h1> Мои заказы</h1>
      </div>

      <div className="sneakersFlex">
        {(isLoading ? [...Array(8)] : orders).map((s, index) => (
          <Card
            key={index}
            {...s}
            favorite={false}
            loading={isLoading}
          />
        ))}
      </div>
    </div>
  );
}
