import classNames from 'classnames';
import './card.scss';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../redux/cartSlice.js';
import { useState } from 'react';

export const Card = ({className, id, img, title, dateDelivery, price}) => {
  const dispatch = useDispatch();
  const [btnText, setHoverText] = useState(`${price}\u00A0₽`);
  
  const handleMouseOver = () => {
    setHoverText('В корзину');
  };
  
  const handleMouseLeave = () => {
    setHoverText(`${price}\u00A0₽`);
  };
  
  const handleAddToCart = () => {
    dispatch(addItemToCart({id, img, title, price}))
  };

  return (
    <article className={classNames(className, 'card')}>
      <img className="card__img" src={img} alt={title}/>
      <div className="card__content">
        <h3 className="card__title">{title}</h3>
        <div className="card__footer">
          <p className="card__date-delivery">{dateDelivery}</p>
          <button className="card__btn" onClick={handleAddToCart} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>{btnText}</button>
        </div>
      </div>
    </article>
  );
};
