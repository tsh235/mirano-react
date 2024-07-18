import classNames from 'classnames';
import './card.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, toggleCart } from '../../redux/cartSlice.js';
import { useEffect, useRef, useState } from 'react';

export const Card = ({className, id, img, title, dateDelivery, price}) => {
  const dispatch = useDispatch();
  const isOpenCart = useSelector(state => state.cart.isOpen);
  const cartItems = useSelector(state => state.cart.items);

  const [btnText, setBtnText] = useState(`${price}\u00A0₽`);

  const addBtnToCartRef = useRef(null);
  
  const handleMouseEnter = () => {
    setBtnText('В корзину');
  };
  
  const handleMouseLeave = () => {
    setBtnText(`${price}\u00A0₽`);
  };
  
  const handleAddToCart = () => {
    dispatch(addItemToCart({productId: id}));
    
    if (window.innerWidth > 768 && !isOpenCart) {
      dispatch(toggleCart());
    }
  };
  
  useEffect(() => {
    if (cartItems.length > 0) {
      const isInCart = cartItems.find(item => item.id === id);
      
      const currentId = addBtnToCartRef.current.dataset.id;

      if (isInCart && isInCart.id === +currentId) {
        setBtnText('В корзине');
        addBtnToCartRef.current.disabled = 'true';
      }
    }
  }, [cartItems, id]);

  return (
    <article className={classNames(className, 'card')}>
      <img className="card__img" src={img} alt={title}/>
      <div className="card__content">
        <h3 className="card__title">{title}</h3>
        <div className="card__footer">
          <p className="card__date-delivery">{dateDelivery}</p>

          <button
            className="card__btn"
            data-id={id}
            onClick={handleAddToCart}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={addBtnToCartRef}
          >
            {btnText}
          </button>
        </div>
      </div>
    </article>
  );
};
