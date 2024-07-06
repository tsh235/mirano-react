import { useDispatch, useSelector } from 'react-redux';
import './header.scss';
import { toggleCart } from '../../redux/cartSlice.js';

export const Header = () => {
  const dispatch = useDispatch();

  const handlerCartToogle = () => {
    dispatch(toggleCart());
  };

  const count = useSelector(state => state.cart.items.length);
  
  return (
    <header className="header">
      <div className="container header__container">
        <form className="header__form">
          <input className="header__input" type="search" name="search" placeholder="Букет из роз" />
          <button className="header__search-btn" aria-label="Найти">
            <svg className="header__search-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.3333 4.16663C13.3333 4.78496 13.9442 5.70829 14.5625 6.48329C15.3575 7.48329 16.3075 8.35579 17.3967 9.02163C18.2133 9.52079 19.2033 9.99996 20 9.99996M20 9.99996C19.2033 9.99996 18.2125 10.4791 17.3967 10.9783C16.3075 11.645 15.3575 12.5175 14.5625 13.5158C13.9442 14.2916 13.3333 15.2166 13.3333 15.8333M20 9.99996H4.76837e-07" stroke="currentColor"/>
            </svg>              
          </button>
        </form>

        <img className="header__logo" src="/img/logo.svg" alt="Логотип Mirano Flower Buetique" width="200" height="65" />

        <button className="header__cart-btn" onClick={handlerCartToogle}>{count}</button>
      </div>
    </header>
  )
};