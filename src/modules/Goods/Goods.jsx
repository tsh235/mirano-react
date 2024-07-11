import './goods.scss';
import './../../scss/preload.scss';
import { Card } from '../Card/Card.jsx';
import { Cart } from '../Cart/Cart.jsx';
import { useSelector } from 'react-redux';
import { API_URL } from '../../const.js';
import { useRef } from 'react';

export const Goods = ({title}) => {
  const {items: goods, status: goodsStatus, error} = useSelector(state => state.goods);
  const goodsRef = useRef(null);

  if (title === 'Результат поиска') {
    goodsRef.current.scrollIntoView({ behavior: 'smooth'});
  }

  let content = null;

  if (goodsStatus === 'loading') {
    content = <div className='preload'></div>
  }

  if (goodsStatus === 'success' && goods.length) {
    content = (
      <ul className="goods__list">
        {goods.map(item => (
          <li key={item.id} className="goods__item">
            <Card
              className="goods__card"
              id={item.id}
              img={`${API_URL}${item.photoUrl}`}
              title={item.name}
              dateDelivery='сегодня в 14:00'
              price={item.price}/>
          </li>
        ))}
      </ul>
    )
  }

  if (goodsStatus === 'success' && !goods.length) {
    // content = <p className='empty-search'>По вашему запросу ничего не найдено</p>
    content = (
      <div className="not-found">
        <p className="not-found__text">По вашему запросу ничего не найдено. Попробуйте изменить запрос.</p>
      </div>
    );
  }

  if (goodsStatus === 'failed') {
    content = <p>{error}</p>
  }

  return (
    <section className="goods" ref={goodsRef}>
      <div className="container">
        <h2 className="goods__title section-title">{title}</h2>
  
        <div className="goods__container">
          {content}
  
          <Cart />
        </div>
      </div>
    </section>
  );
};