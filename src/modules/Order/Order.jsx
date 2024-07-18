import { useDispatch, useSelector } from 'react-redux';
import s from './Order.module.scss';
import { closeModal, sendOrder, updateOrderData } from '../../redux/orderSlice.js';
import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { formatDate } from '../../util.js';

export const Order = () => {
  const dispatch = useDispatch();
  const itemsCart = useSelector(state => state.cart.items);
  const {isOpen, orderId, data: orderData, times: orderInterval} = useSelector(state => state.order);

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

  const getTimeInterval = (start, end) => {
    const currentTime = new Date();
    const startTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), start, 0, 0);
    const endTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), end, 0, 0);
    const newCurrentTime = new Date(currentTime.getTime() + (1 * 60 * 60 * 1000));

    let IsTimeInInterval = null;

    if (startTime <= newCurrentTime && newCurrentTime <= endTime) {
      IsTimeInInterval = true;
    } else {
      IsTimeInInterval = false;
    }

    return IsTimeInInterval;
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

  const [intervals, setIntervals] = useState([]);
  console.log('intervals: ', intervals);

  useEffect(() => {
    const currentDate = new Date();
    const formatedCurrentDate = formatDate(currentDate);

    if (orderData.deliveryDate > formatedCurrentDate || (orderData.deliveryDate === formatedCurrentDate && getTimeInterval(0, 12))) {
      setIntervals(['9-12', '12-15', '15-18', '18-21']);
    } else if (orderData.deliveryDate === formatedCurrentDate && getTimeInterval(12, 15)) {
      setIntervals(['12-15', '15-18', '18-21']);
    } else if (orderData.deliveryDate === formatedCurrentDate && getTimeInterval(15, 18)) {
      setIntervals(['15-18', '18-21']);
    } else if (orderData.deliveryDate === formatedCurrentDate && getTimeInterval(18, 21)) {
      setIntervals(['18-21']);
    } else {
      setIntervals(['9-12', '12-15', '15-18', '18-21']);
      console.log('Все');
    }

  }, [orderData.deliveryDate, orderData]);

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
                    required
                  />
                  <input
                    className={s.input}
                    type="text"
                    name="buyerPhone"
                    placeholder="Телефон"
                    value={orderData.buyerPhone}
                    onChange={handleChange}
                    required
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
                    required
                  />
                  <input
                    className={s.input}
                    type="text"
                    name="recipientPhone"
                    placeholder="Телефон"
                    value={orderData.recipientPhone}
                    onChange={handleChange}
                    required
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
                    required
                  />
                  <input
                    className={classNames(s.input, s.input_min)}
                    type="text"
                    name="house"
                    placeholder="Дом"
                    value={orderData.house}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className={classNames(s.input, s.input_min)}
                    type="text"
                    name="apartment"
                    placeholder="Квартира"
                    value={orderData.apartment}
                    onChange={handleChange}
                    required
                  />
                </div>
              </fieldset>

              <fieldset className={s.fieldset}>
                <div className={s.payment}>
                  <label className={s["label-radio"]}>
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
                  <label className="delivery">Дата доставки</label>
                  <input
                    className={s.input}
                    type="date"
                    name="deliveryDate"
                    min={new Date().toISOString().split("T")[0]}
                    defaultValue={orderData.deliveryDate}
                    onChange={handleChange}
                    required
                  />

                  <label className="delivery">Время доставки</label>
                  <div className={s["select-wrapper"]}>
                    <select
                      className={s.select}
                      name="deliveryTime"
                      id="delivery"
                      value={orderData.deliveryTime}
                      onChange={handleChange}
                      required
                    >
                      {
                        intervals.forEach(item => {
                          Object.entries(orderInterval).map(
                            ([key, value]) => {
                              if (key === item) {
                                return <option key={Math.random()} value={key}>{value}</option>
                              }
                            }
                          )
                        })
                      }
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
