import { useDispatch } from 'react-redux';
import { API_URL } from '../../const.js';
import s from './CartItem.module.scss';
import { addItemToCart } from '../../redux/cartSlice.js';
import { useState } from 'react';
import { debounce } from '../../util.js';

export const CartItem = ({id, photoUrl, name, price, quantity}) => {
  const dispatch = useDispatch();
  const [inputQuantity, setInputQuantity] = useState(quantity);

  const debounceInputChange = debounce((newQuantity) => {
    dispatch(addItemToCart({productId: id, quantity: newQuantity}));
  }, 500);

  const handleChangeQuantity = (n) => {
    const newQuantity = inputQuantity + n;
    setInputQuantity(newQuantity);
    dispatch(addItemToCart({productId: id, quantity: newQuantity}));
  };

  const handleChangeInput = ({target}) => {
    const newQuantity = parseInt(target.value);
    setInputQuantity(newQuantity);
    debounceInputChange(newQuantity);
  };
  
  return (
    <li className={s.item}>
      <img className={s.img} src={`${API_URL}${photoUrl}`} alt={name} />

      <h4 className={s.title}>{name}</h4>

      <div className={s.counter}>
        <button
          className={s.btn}
          onClick={() => handleChangeQuantity(-1)}
        >-</button>

        <input
          className={s.input}
          type="number"
          name="count"
          min="0"
          max="99"
          value={inputQuantity}
          onChange={handleChangeInput}
        />
        
        <button
          className={s.btn}
          onClick={() => handleChangeQuantity(1)}
        >+</button>
      </div>

      <p className={s.price}>{price * inputQuantity}&nbsp;₽</p>
    </li>
  )
};
