import { useEffect, useRef, useState } from 'react';
import { Choices } from '../Choices/Choices.jsx';
import './filter.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoods } from '../../redux/goodsSlice.js';
import { debounce, getValidFilters } from '../../util.js';
import { setFilters } from '../../redux/filterSlice.js';

export const Filter = () => {
  const dispatch = useDispatch();
  
  const [openChoice, setOpenChoice] = useState(null);
  
  const filters = useSelector(state => state.filters);
  // const [filters, setFiltres] = useState({
    //   type: 'bouquets',
  //   minPrice: '',
  //   maxPrice: '',
  //   category: '',
  // });

  const prevFiltersRef = useRef({});

  const debouncedFetchGoods = useRef(
    debounce((filters) => {
      dispatch(fetchGoods(filters));
    }, 500),
  ).current;
  
  useEffect(() => {
    const prevFilters = prevFiltersRef.current;
    const validFilters = getValidFilters(filters);

    if (prevFilters.type !== filters.type) {
      dispatch(fetchGoods(validFilters));
    } else {
      debouncedFetchGoods(filters);
    }

    prevFiltersRef.current = filters;
  }, [dispatch, debouncedFetchGoods, filters]);
  
  const handleChoicesToggle = (index) => {
    setOpenChoice(openChoice === index ? null : index);
  };

  const handleChangeType = ({target}) => {
    const {value} = target;
    const newFilters = {...filters, type: value, minPrice: '', maxPrice: ''};
    dispatch(setFilters(newFilters));
    handleChoicesToggle();
  };

  const handleChangePrice = ({target}) => {
    const {name, value} = target;
    const newFilters = {
      ...filters,
      [name]: !isNaN(parseInt(value, 10)) ? value : '',
    };
    dispatch(setFilters(newFilters));
  };

  return (
    <section className="filter">
      <h2 className="visually-hidden">Фильтр</h2>
      <div className="container">
        <form className="filter__form">
          <fieldset className="filter__group">
            <input className="filter__radio" type="radio" name="type" id="bouquets"
              value="bouquets"
              checked={filters.type === 'bouquets'}
              onChange={handleChangeType} 
            />
            <label className="filter__label filter__label_flowers" htmlFor="bouquets">Цветы</label>
          
            <input className="filter__radio" type="radio" name="type" id="toys"
              value="toys"
              checked={filters.type === 'toys'}
              onChange={handleChangeType}
            />
            <label className="filter__label filter__label_toys" htmlFor="toys">Игрушки</label>
          
            <input className="filter__radio" type="radio" name="type" id="postcards"
              value="postcards"
              checked={filters.type === 'postcards'}
              onChange={handleChangeType}
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
                <input className="filter__input-price" type="text" placeholder="от"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleChangePrice}
                />

                <input className="filter__input-price" type="text" placeholder="до"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleChangePrice}
                />
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
