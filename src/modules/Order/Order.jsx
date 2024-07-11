import { useDispatch, useSelector } from 'react-redux';
import s from './Order.module.scss';
import { closeModal } from '../../redux/orderSlice.js';
import classNames from 'classnames';
import { useCallback, useEffect } from 'react';

export const Order = () => {
  const isOrderSuccess = false;
  const isOpen = useSelector(state => state.order.isOpen);

  const dispatch = useDispatch();

  // можно через классы, только в модульной системе scss 
  // нужно будет писать так: if (target.matches(`.${s.order}`) || target.closest(`.${s.close}`))
  // const handlerClose = ({target}) => {
  //   if (target.matches('.order') || target.closest('.order__close')) {
  //     dispatch(closeModal());
  //   }
  // };

  // а так, повесив события для элементов отдельно на каждый
  const handleClose = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, handleClose]);

  if (!isOpen) return null;
  
  return (
    <div className={s.order} onClick={handleClose}>
      <div className={s.wrapper} onClick={(e) => e.stopPropagation()}>
        {isOrderSuccess ?
          <>
            <h2 className={s.title}>Заказ оформлен</h2>
            <p className={s.success}>Номер заказа: 579687658454654564</p>
          </>
          :
          <>
            <h2 className={s.title}>Оформить заказ</h2>

            <form className={s.form} id="order">
              <fieldset className={s.fieldset}>
                <legend className={s.legend}>Данные заказчика</legend>
                <div className={s['input-group']}>
                  <input className={s.input} type="text" name="name-buyer" placeholder="Имя" />
                  <input className={s.input} type="text" name="phone-buyer" placeholder="Телефон" />
                </div>
              </fieldset>

              <fieldset className={s.fieldset}>
                <legend className={s.legend}>Данные получателя</legend>
                <div className={s['input-group']}>
                  <input className={s.input} type="text" name="name-recipient" placeholder="Имя" />
                  <input className={s.input} type="text" name="phone-recipient" placeholder="Телефон" />
                </div>
              </fieldset>

              <fieldset className={s.fieldset}>
                <legend className={s.legend}>Адрес</legend>
                <div className={s['input-group']}>
                  <input className={classNames(s.input, s.input_max)} type="text" name="street" placeholder="Улица" />
                  <input className={classNames(s.input, s.input_min)} type="text" name="house" placeholder="Дом" />
                  <input className={classNames(s.input, s.input_min)} type="text" name="apartment" placeholder="Квартира" />
                </div>
              </fieldset>

              <fieldset className={s.fieldset}>
                <div className={s.payment}>
                  <label className={s['label-radio']}>
                    <input className={s.radio} type="radio" name="payment-online" defaultChecked />
                    Оплата онлайн
                  </label>
                </div>

                <div className={s.delivery}>
                  <label className="delivery">Доставка 25.07</label>
                  <input type="hidden" name="delivery-date" value="25.07" />

                  <div className={s['select-wrapper']}>
                    <select className={s.select} name="delivery-time" id="delivery">
                      <option value="9-12">с 9:00 до 12:00</option>
                      <option value="12-15">с 12:00 до 15:00</option>
                      <option value="15-18">с 15:00 до 18:00</option>
                      <option value="18-21">с 18:00 до 21:00</option>
                    </select>
                  </div>
                </div>
              </fieldset>
            </form>

            <div className={s.footer}>
              <p className={s.totalPrice}>20000&nbsp;₽</p>
              <button className={s.btn} type="submit" form="order">Заказать</button>
            </div>
          </>
        }
        <button className={s.close} type="button" onClick={handleClose}>&times;</button>
      </div>
    </div>
  );
};
