import { useEffect, useRef, useState } from 'react';
import { Choices } from '../Choices/Choices.jsx';
import './filter.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoods } from '../../redux/goodsSlice.js';
import { debounce, getValidFilters } from '../../util.js';
import { changeType, changePrice } from '../../redux/filtersSlice.js';
import { FilterRadio } from './FilterRadio.jsx';

const filterTypes = [
  {value: 'bouquets', title: 'Цветы'},
  {value: 'toys', title: 'Игрушки'},
  {value: 'postcards', title: 'Открытки'},
];

export const Filter = ({setTitleGoods}) => {
  const dispatch = useDispatch();
  
  const [openChoice, setOpenChoice] = useState(null);
  const filters = useSelector(state => state.filters);
  const prevFiltersRef = useRef({});

  const debouncedFetchGoods = useRef(
    debounce((filters) => {
      dispatch(fetchGoods(filters));
    }, 500),
  ).current;
  
  useEffect(() => {
    const prevFilters = prevFiltersRef.current;
    const validFilters = getValidFilters(filters);

    if (!validFilters.type) {
      return;
    }

    if (prevFilters.type !== validFilters.type) {
      dispatch(fetchGoods(validFilters));
      setTitleGoods(filterTypes.find(item => item.value === validFilters.type).title);
    } else {
      debouncedFetchGoods(validFilters);
    }

    prevFiltersRef.current = filters;
  }, [dispatch, debouncedFetchGoods, setTitleGoods, filters]);
  
  const handleChoicesToggle = (index) => {
    setOpenChoice(openChoice === index ? null : index);
  };

  const handleChangeType = ({target}) => {
    const {value} = target;
    dispatch(changeType(value));
    setTitleGoods(filterTypes.find(item => item.value === value).title);
    setOpenChoice(-1);
  };

  const handleChangePrice = ({target}) => {
    const {name, value} = target;
    dispatch(changePrice({name, value}));
  };

  return (
    <section className="filter">
      <h2 className="visually-hidden">Фильтр</h2>
      <div className="container">
        <form className="filter__form">
          <fieldset className="filter__group">
            {filterTypes.map(item => (
              <FilterRadio
                key={item.value}
                handleChangeType={handleChangeType}
                data={item}
                type={filters.type}
              />))
            }
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
