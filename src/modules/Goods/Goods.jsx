import './goods.scss';
import { Card } from '../Card/Card.jsx';
import { Cart } from '../Cart/Cart.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoods } from '../../redux/goodsSlice.js';
import { useEffect } from 'react';
import { API_URL } from '../../const.js';

export const Goods = () => {
  const dispatch = useDispatch();
  const {items: goods, status: goodsStatus, error, type} = useSelector(state => state.goods);

  useEffect(() => {
    if (goodsStatus === 'idle') {
      dispatch(fetchGoods({type}));
    }
  }, [dispatch, goodsStatus, type]);

  let content = null;

  if (goodsStatus === 'loading') {
    content = <p className='preload'>Loading...</p>
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
        <h2 className="goods__title section-title">Цветы</h2>
  
        <div className="goods__container">
          {content}
  
          <Cart />
        </div>
      </div>
    </section>
  );
};