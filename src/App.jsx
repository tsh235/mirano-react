import { Header } from './modules/Header/Header.jsx';
import { Hero } from './modules/Hero/Hero.jsx';
import { Filter } from './modules/Filter/Filter.jsx';
import { Goods } from './modules/Goods/Goods.jsx';
import { Subscribe } from './modules/Subscribe/Subscribe.jsx';
import { Footer } from './modules/Footer/Footer.jsx';
import { Order } from './modules/Order/Order.jsx';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCart, registerCart } from './redux/cartSlice.js';

export const App = () => {
  const dispatch = useDispatch();
  const [titleGoods, setTitleGoods] = useState('');
  const filterRef = useRef(null);

  useEffect(() => {
    const initializeCart = async () => {
      await dispatch(registerCart());
      await dispatch(fetchCart());
    };
    
    initializeCart();
  }, [dispatch]);

  const scrollToFilter = () => {
    if (filterRef.current) {
      filterRef.current.scrollIntoView({ behavior: 'smooth'});
    }
  };
  
  return (
    <>
      <Header setTitleGoods={setTitleGoods} scrollToFilter={scrollToFilter}/>

      <main>
        <Hero />

        <Filter setTitleGoods={setTitleGoods} filterRef={filterRef}/>

        <Goods title={titleGoods}/>

        <Subscribe />
      </main>

      <Footer />

      <Order />
    </>
  );
};
