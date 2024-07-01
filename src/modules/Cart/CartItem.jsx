export const CartItem = () => (
  <li className="cart__item">
    <img className="cart__img" src="/img/hero-left@1x.webp" alt="" />

    <h4 className="cart__item-title">Букет ромашек</h4>

    <div className="cart__counter">
      <button className="cart__counter-btn">-</button>
      <input className="cart__counter-input" type="number" name="count" min="0" max="99" value="5" />
      <button className="cart__counter-btn">+</button>
    </div>

    <p className="cart__price">50000&nbsp;₽</p>
  </li>
);
