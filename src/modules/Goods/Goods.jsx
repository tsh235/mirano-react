import './goods.scss';
import { goodsArray } from '../../goodsArray.js';
import { Card } from '../Card/Card.jsx';
import { Cart } from '../Cart/Cart.jsx';

export const Goods = () => (
  <section className="goods">
    <div className="container">
      <h2 className="goods__title section-title">Цветы</h2>

      <div className="goods__container">
        <ul className="goods__list">
          {goodsArray.map(item => (
            <li key={item.id} className="goods__item">
              <Card className="goods__card" {...item} />
            </li>
          ))}
        </ul>

        <Cart />
      </div>
    </div>
  </section>
)