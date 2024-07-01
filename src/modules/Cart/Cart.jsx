import './cart.scss';
import { CartItem } from './CartItem.jsx';

export const Cart = () => (
  <section className="cart">
    <div className="cart__container">
      <div className="cart__header">
        <h3 className="cart__title">Ваш заказ</h3>
        <button className="cart__close" aria-label="Закрыть корзину">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="5.70715" width="1" height="25" transform="rotate(-45 5 5.70715)" fill="currentColor"/>
            <rect x="22.6777" y="5" width="1" height="25" transform="rotate(45 22.6777 5)" fill="currentColor"/>
          </svg>                    
        </button>
      </div>

      <p className="cart__date-delivery">сегодня в 14:00</p>

      <ul className="cart__list">
        <CartItem />
        <CartItem />
        <CartItem />
      </ul>

      <div className="cart__footer">
        <button className="cart__order-btn">Оформить</button>
        <p className="cart__price cart__price_total">0&nbsp;₽</p>
      </div>
    </div>
  </section>
);
