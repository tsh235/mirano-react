import classNames from 'classnames';
import './card.scss';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../redux/cartSlice.js';
import { useState } from 'react';

export const Card = ({className, id, img, title, dateDelivery, price}) => {
  const dispatch = useDispatch();

  const [btnText, setBtnText] = useState(`${price}\u00A0₽`);
  
  const handleMouseEnter = () => {
    setBtnText('В корзину');
  };
  
  const handleMouseLeave = () => {
    setBtnText(`${price}\u00A0₽`);
  };
  
  const handleAddToCart = () => {
    dispatch(addItemToCart({productId: id, quantity: 1}));
  };

  return (
    <article className={classNames(className, 'card')}>
      <img className="card__img" src={img} alt={title}/>
      <div className="card__content">
        <h3 className="card__title">{title}</h3>
        <div className="card__footer">
          <p className="card__date-delivery">{dateDelivery}</p>
          <button className="card__btn" onClick={handleAddToCart} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{btnText}</button>
        </div>
      </div>
    </article>
  );
};
