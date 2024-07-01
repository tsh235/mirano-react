import './filter.scss';
import './choices.scss';

export const Filter = () => (
  <section className="filter">
    <h2 className="visually-hidden">Фильтр</h2>
    <div className="container">
      <form className="filter__form">
        <fieldset className="filter__group">
          <input className="filter__radio" type="radio" name="type" id="bouquets" value="bouquets" defaultChecked />
          <label className="filter__label filter__label_flowers" htmlFor="bouquets">Цветы</label>
        
          <input className="filter__radio" type="radio" name="type" id="toys" value="toys" />
          <label className="filter__label filter__label_toys" htmlFor="toys">Игрушки</label>
        
          <input className="filter__radio" type="radio" name="type" id="postcards" value="postcards" />
          <label className="filter__label filter__label_postcard" htmlFor="postcards">Открытки</label>
        </fieldset>

        <fieldset className="filter__group filter__group_choices">
          <div className="filter__choices choices">
            <button className="filter__select choices__btn" type="button">Цена</button>
            <div className="filter__choices-box choices__box">
              <fieldset className="filter__price">
                <input className="filter__input-price" type="text" placeholder="от" name="minPrice" />
                <input className="filter__input-price" type="text" placeholder="до" name="maxPrice" />
              </fieldset>
            </div>
          </div>

          <div className="filter__choices filter__choices_type choices">
            <button className="filter__select choices__btn" type="button">Тип товара</button>
            <div className="filter__choices-box filter__choices-box_type choices__box"></div>
          </div>
        </fieldset>
      </form>
    </div>
  </section>
)