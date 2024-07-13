import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../../const.js';
import s from './CartItem.module.scss';
import { addItemToCart, calculateCartTotalPrice } from '../../redux/cartSlice.js';

export const CartItem = ({id, photoUrl, name, price, quantity}) => {
  const dispatch = useDispatch();

  const cartItems = useSelector(state => state.cart.items);
  
  const handleChangeQuantity = (n) => {
    dispatch(addItemToCart({productId: id, quantity: quantity += n}));
    dispatch(calculateCartTotalPrice());
  };
  console.log('items: ', cartItems);
  
  return (
    <li className={s.item}>
      <img className={s.img} src={`${API_URL}${photoUrl}`} alt={name} />

      <h4 className={s.title}>{name}</h4>

      <div className={s.counter}>
        <button
          className={s.btn}
          onClick={() => handleChangeQuantity(-1)}
        >-</button>

        <input className={s.input} type="number" name="count" min="0" max="99" value={quantity} />
        
        <button
          className={s.btn}
          onClick={() => handleChangeQuantity(1)}
        >+</button>
      </div>

      <p className={s.price}>{price * quantity}&nbsp;₽</p>
    </li>
  )
};
