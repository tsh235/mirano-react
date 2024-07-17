import { useEffect, useRef, useState } from 'react';
import { Choices } from '../Choices/Choices.jsx';
import './filter.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoods } from '../../redux/goodsSlice.js';
import { debounce, getValidFilters, isNumber } from '../../util.js';
import { changeType, changePrice, changeCategory } from '../../redux/filtersSlice.js';
import { FilterRadio } from './FilterRadio.jsx';
import classNames from 'classnames';

const filterTypes = [
  {value: 'bouquets', title: 'Цветы'},
  {value: 'toys', title: 'Игрушки'},
  {value: 'postcards', title: 'Открытки'},
];

export const Filter = ({setTitleGoods}) => {
  const dispatch = useDispatch();
  
  const filters = useSelector(state => state.filters);
  const categories = useSelector(state => state.goods.categories);
  
  const [openChoice, setOpenChoice] = useState(null);

  const filterRef = useRef(null);
  const prevFiltersRef = useRef(filters);

  const debouncedFetchGoods = useRef(
    debounce((filters) => {
      dispatch(fetchGoods(filters));
    }, 500),
  ).current;

  useEffect(() => {
    if (filters.search) {
      filterRef.current.scrollIntoView({ behavior: 'smooth'});
    }
  }, [filters]);

  useEffect(() => {
    document.addEventListener('click', (e) => {
      const target = e.target.closest('.filter__group_choices');

      if (!target && (openChoice !== null || openChoice !== -1)) {
        setOpenChoice(-1);
      }
    })
  }, [openChoice])
  
  useEffect(() => {
    const prevMinPrice = prevFiltersRef.current.minPrice;
    const prevMaxPrice = prevFiltersRef.current.maxPrice;

    const validFilters = getValidFilters(filters);

    if (!validFilters.type && !validFilters.search) {
      return;
    }

    if (prevMinPrice !== filters.minPrice || prevMaxPrice !== filters.maxPrice) {
      debouncedFetchGoods(validFilters);
    } else {
      dispatch(fetchGoods(validFilters));

      const type = filterTypes.find(item => item.value === validFilters.type);

      if (type) {
        setTitleGoods(type.title);
      } 

      if (validFilters.search) {
        setTitleGoods('Результат поиска');
      }
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

  const handleChangePrice = (e) => {
    if (isNumber(e.nativeEvent.data) || e.nativeEvent.data === null) {
      const {name, value} = e.target;
      dispatch(changePrice({name, value}));
    }
  };

  const handleCategoryChange = (category) => {
    dispatch(changeCategory(category));
    setOpenChoice(-1);
  };

  return (
    <section className="filter" ref={filterRef}>
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

            {categories.length ? (
              <Choices
                buttonLabel="Тип товара"
                isOpen={openChoice === 1}
                onToggle={() => handleChoicesToggle(1)}
              >
                <ul className="filter__type-list">
                  <li className="filter__type-item">
                    <button
                      className="filter__type-btn"
                      type="button"
                      onClick={() => handleCategoryChange('')}
                    >Все типы товара</button>
                    </li>
                  {categories.map(category => (
                    <li key={category} className="filter__type-item">
                      <button
                        className={classNames('filter__type-btn', category === filters.category ? 'filter__type-btn_active' : '')}
                        type="button"
                        onClick={() => handleCategoryChange(category)}
                      >{category}</button>
                    </li>
                  ))}
                </ul>
              </Choices>
            ) : null}

          </fieldset>
        </form>
      </div>
    </section>
  );
};
