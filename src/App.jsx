import { Header } from './modules/Header/Header.jsx';
import { Hero } from './modules/Hero/Hero.jsx';
import { Filter } from './modules/Filter/Filter.jsx';
import { Goods } from './modules/Goods/Goods.jsx';
import { Subscribe } from './modules/Subscribe/Subscribe.jsx';
import { Footer } from './modules/Footer/Footer.jsx';
import { Order } from './modules/Order/Order.jsx';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCart, registerCart } from './redux/cartSlice.js';

export const App = () => {
  const dispatch = useDispatch();
  const [titleGoods, setTitleGoods] = useState('');

  useEffect(() => {
    const initializeCart = async () => {
      await dispatch(registerCart());
      await dispatch(fetchCart());
    };
    
    initializeCart();
  }, [dispatch]);
  
  return (
    <>
      <Header/>

      <main>
        <Hero />

        <Filter setTitleGoods={setTitleGoods}/>

        <Goods title={titleGoods}/>

        <Subscribe />
      </main>

      <Footer />

      <Order />
    </>
  );
};
