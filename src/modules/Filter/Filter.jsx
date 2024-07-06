import { useState } from 'react';
import { Choices } from '../Choices/Choices.jsx';
import './filter.scss';
import { useDispatch } from 'react-redux';
import { goodsType } from '../../redux/goodsSlice.js';

export const Filter = () => {
  const dispatch = useDispatch();
  
  const handleChangeType = (type) => {
    dispatch(goodsType({type}));
  };
  
  const [openChoice, setOpenChoice] = useState(null);
  
  const handleChoicesToggle = (index) => {
    setOpenChoice(openChoice === index ? null : index);
  };

  return (
    <section className="filter">
      <h2 className="visually-hidden">Фильтр</h2>
      <div className="container">
        <form className="filter__form">
          <fieldset className="filter__group">
            <input className="filter__radio" type="radio" name="type" id="bouquets"
              value="bouquets"
              defaultChecked
              onChange={() => handleChangeType('bouquets')} 
            />
            <label className="filter__label filter__label_flowers" htmlFor="bouquets">Цветы</label>
          
            <input className="filter__radio" type="radio" name="type" id="toys"
              value="toys"
              onChange={() => handleChangeType('toys')}
            />
            <label className="filter__label filter__label_toys" htmlFor="toys">Игрушки</label>
          
            <input className="filter__radio" type="radio" name="type" id="postcards"
              value="postcards"
              onChange={() => handleChangeType('postcards')}
            />
            <label className="filter__label filter__label_postcard" htmlFor="postcards">Открытки</label>
          </fieldset>

          <fieldset className="filter__group filter__group_choices">
            <Choices
              buttonLabel="Цена"
              isOpen={openChoice === 0}
              onToggle={() => handleChoicesToggle(0)}
            >
              <fieldset className="filter__price">
                <input className="filter__input-price" type="text" placeholder="от" name="minPrice" />
                <input className="filter__input-price" type="text" placeholder="до" name="maxPrice" />
              </fieldset>
            </Choices>

            <Choices
              buttonLabel="Тип товара"
              isOpen={openChoice === 1}
              onToggle={() => handleChoicesToggle(1)}
            >
              <ul className="filter__type-list">
                <li className="filter__type-item">
                  <button className="filter__type-btn" type="button">Монобукеты</button>
                </li>
                <li className="filter__type-item">
                  <button className="filter__type-btn" type="button">Авторские букеты</button>
                </li>
                <li className="filter__type-item">
                  <button className="filter__type-btn" type="button">Цветы в корзине</button>
                </li>
              </ul>
            </Choices>
          </fieldset>
        </form>
      </div>
    </section>
  );
};
