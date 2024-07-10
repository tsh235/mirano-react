import './goods.scss';
import './../../scss/preload.scss';
import { Card } from '../Card/Card.jsx';
import { Cart } from '../Cart/Cart.jsx';
import { useSelector } from 'react-redux';
import { API_URL } from '../../const.js';

export const Goods = ({title}) => {
  const {items: goods, status: goodsStatus, error} = useSelector(state => state.goods);

  let content = null;

  if (goodsStatus === 'loading') {
    content = <div className='preload'></div>
  }

  if (goodsStatus === 'success') {
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

  if (goodsStatus === 'failed') {
    content = <p>{error}</p>
  }

  return (
    <section className="goods">
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