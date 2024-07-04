import s from './CartItem.module.scss';

export const CartItem = ({img, title, price}) => (
  <li className={s.item}>
    <img className={s.img} src={img} alt={title} />

    <h4 className={s.title}>{title}</h4>

    <div className={s.counter}>
      <button className={s.btn}>-</button>
      <input className={s.input} type="number" name="count" min="0" max="99" value="5" />
      <button className={s.btn}>+</button>
    </div>

    <p className={s.price}>{price}&nbsp;₽</p>
  </li>
);
