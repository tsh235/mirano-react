import { useDispatch, useSelector } from 'react-redux';
import s from './Order.module.scss';
import { closeModal, sendOrder, updateOrderData } from '../../redux/orderSlice.js';
import classNames from 'classnames';
import { useCallback, useEffect } from 'react';

export const Order = () => {
  const dispatch = useDispatch();
  const itemsCart = useSelector(state => state.cart.items);
  const {isOpen, orderId, data: orderData} = useSelector(state => state.order);

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

  const handleChange = ({target}) => {
    const {name, value} = target;
    dispatch(updateOrderData({
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendOrder());
  };
  
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
        {orderId ?
          <>
            <h2 className={s.title}>Заказ оформлен</h2>
            <p className={s.success}>Номер заказа: {orderId}</p>
          </>
          :
          <>
            <h2 className={s.title}>Оформить заказ</h2>

            <form className={s.form} id="order" onSubmit={handleSubmit}>
              <fieldset className={s.fieldset}>
                <legend className={s.legend}>Данные заказчика</legend>
                <div className={s['input-group']}>
                  <input
                    className={s.input}
                    type="text"
                    name="buyerName"
                    placeholder="Имя"
                    value={orderData.buyerName}
                    onChange={handleChange}
                  />
                  <input
                    className={s.input}
                    type="text"
                    name="buyerPhone"
                    placeholder="Телефон"
                    value={orderData.buyerPhone}
                    onChange={handleChange}
                  />
                </div>
              </fieldset>

              <fieldset className={s.fieldset}>
                <legend className={s.legend}>Данные получателя</legend>
                <div className={s['input-group']}>
                  <input
                    className={s.input}
                    type="text"
                    name="recipientName"
                    placeholder="Имя"
                    value={orderData.recipientName}
                    onChange={handleChange} 
                  />
                  <input
                    className={s.input}
                    type="text"
                    name="recipientPhone"
                    placeholder="Телефон"
                    value={orderData.recipientPhone}
                    onChange={handleChange} 
                  />
                </div>
              </fieldset>

              <fieldset className={s.fieldset}>
                <legend className={s.legend}>Адрес</legend>
                <div className={s['input-group']}>
                  <input
                    className={classNames(s.input, s.input_max)}
                    type="text"
                    name="street"
                    placeholder="Улица"
                    value={orderData.street}
                    onChange={handleChange}
                  />
                  <input
                    className={classNames(s.input, s.input_min)}
                    type="text"
                    name="house"
                    placeholder="Дом"
                    value={orderData.house}
                    onChange={handleChange}
                  />
                  <input
                    className={classNames(s.input, s.input_min)}
                    type="text"
                    name="apartment"
                    placeholder="Квартира"
                    value={orderData.apartment}
                    onChange={handleChange}
                  />
                </div>
              </fieldset>

              <fieldset className={s.fieldset}>
                <div className={s.payment}>
                  <label className={s['label-radio']}>
                    <input
                      className={s.radio}
                      type="radio"
                      name="paymentOnline"
                      defaultChecked
                      value={orderData.paymentOnline === 'true'}
                      onChange={handleChange}
                    />
                    Оплата онлайн
                  </label>
                </div>

                <div className={s.delivery}>
                  <label className="delivery">Доставка 25.07</label>
                  <input
                    type="hidden"
                    name="deliveryDate"
                    value={orderData.deliveryDate}
                    onChange={handleChange}
                  />

                  <div className={s['select-wrapper']}>
                    <select className={s.select} name="deliveryTime" id="delivery" value={orderData.deliveryTime} onChange={handleChange}>
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
              <p className={s.totalPrice}>{itemsCart.reduce((acc, item) => acc + (item.price * item.quantity), 0)}&nbsp;₽</p>
              <button className={s.btn} type="submit" form="order">Заказать</button>
            </div>
          </>
        }
        <button className={s.close} type="button" onClick={handleClose}>&times;</button>
      </div>
    </div>
  );
};
