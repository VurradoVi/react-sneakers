import React from 'react'

export default function Card() {
  return (
    <div className="card">
          <div className="favorite">
            <img src="/img/favorite.svg" alt="favorite" />
          </div>
          <img
            width={133}
            height={112}
            src="/img/sneakers/s1.jpg"
            alt="sneakers"
          />
          <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
          <div className="cardBottom">
            <div>
              <span>Цена:</span>
              <b>12 999 руб.</b>
            </div>
            <button>
              <img width={11} height={11} src="/img/Vector.svg" alt="btn" />
            </button>
          </div>
        </div>
  )
}
