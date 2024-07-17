import { useDispatch } from 'react-redux';
import { API_URL } from '../../const.js';
import s from './CartItem.module.scss';
import { addItemToCart } from '../../redux/cartSlice.js';
import { useState } from 'react';
import { debounce, isNumber } from '../../util.js';

export const CartItem = ({id, photoUrl, name, price, quantity}) => {
  const dispatch = useDispatch();
  const [inputQuantity, setInputQuantity] = useState(quantity);

  const debounceInputChange = debounce((newQuantity) => {
    if (isNumber(newQuantity)) {
      dispatch(addItemToCart({productId: id, quantity: newQuantity}));
    }
  }, 500);
  
  const handleChangeInput = (e) => {
    const newQuantity = parseInt(e.target.value);
    setInputQuantity(newQuantity);
    debounceInputChange(newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = inputQuantity - 1 > 0 ? inputQuantity - 1 : 0;
    
    setInputQuantity(newQuantity);
    dispatch(addItemToCart({productId: id, quantity: newQuantity}));
  };

  const handleIncrement = () => {
    const newQuantity = inputQuantity + 1;
    setInputQuantity(newQuantity);
    dispatch(addItemToCart({productId: id, quantity: newQuantity}));
  };
  
  return (
    <li className={s.item}>
      <img className={s.img} src={`${API_URL}${photoUrl}`} alt={name} />

      <h4 className={s.title}>{name}</h4>

      <div className={s.counter}>
        <button className={s.btn} onClick={handleDecrement}>-</button>

        <input
          className={s.input}
          type="number"
          name="count"
          min="0"
          max="99"
          value={inputQuantity}
          onChange={handleChangeInput}
        />
        
        <button className={s.btn} onClick={handleIncrement}>+</button>
      </div>

      <p className={s.price}>{inputQuantity ? price * inputQuantity : 0}&nbsp;₽</p>
    </li>
  )
};
