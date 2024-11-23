import Header from "../Header";

export default function Favorite({ onClickCart }: { onClickCart: () => void }) {
  return (
    <div className="wrapper">
      <Header onClickCart={onClickCart} />
      <h1>Избранное</h1>
      <p>Здесь будут отображаться избранные товары.</p>
    </div>
  );
}
