// rxslice и таб раскрывает структуру
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { closeCart, fetchCart } from './cartSlice.js';
import { API_URL } from '../const.js';
import { formatDate } from '../util.js';

export const sendOrder = createAsyncThunk('order/sendOrder', async (_, {getState, dispatch, rejectWhithValue}) => {
  try {
    const {order: {data: {
      buyerName,
      buyerPhone,
      recipientName,
      recipientPhone,
      street,
      house,
      apartment,
      paymentOnline,
      deliveryDate,
      deliveryTime,
    }}} = getState();
  
    const orderData = {
      buyer: {
        name: buyerName,
        phone: buyerPhone,
      },
      recipient: {
        name: recipientName,
        phone: recipientPhone,
      },
      address: `${street}, ${house}, ${apartment}`,
      paymentOnline: paymentOnline,
      deliveryDate,
      deliveryTime,
    };
  
    const response = await fetch(`${API_URL}/api/orders`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
  
    if (!response.ok) {
      throw new Error('Не удалось ооформить заказ!');
    }
  
    const data =  await response.json();

    dispatch(clearOrder());
    dispatch(closeCart());
    dispatch(fetchCart());

    return data;
  
  } catch (error) {
    return rejectWhithValue(error.message);
  }
});

const deliveryDate = formatDate();

const initialState = {
  isOpen: false,
  orderId: '',
  status: 'idle',
  error: null,
  data: {
    buyerName: '',
    buyerPhone: '',
    recipientName: '',
    recipientPhone: '',
    street: '',
    house: '',
    apartment: '',
    paymentOnline: 'true',
    deliveryDate: deliveryDate,
    deliveryTime: '',
  },
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    openModal(state) {
      state.isOpen = true;
    },
    closeModal(state) {
      state.isOpen = false;
    },
    clearOrder(state) {
      state.data = {
        buyerName: '',
        buyerPhone: '',
        recipientName: '',
        recipientPhone: '',
        street: '',
        house: '',
        apartment: '',
        paymentOnline: 'true',
        deliveryDate: '',
        deliveryTime: '',
      };
    },
    updateOrderData(state, action) {
      // state.data[action.payload.name] = action.payload.value; оба способа имеют место быть
      state.data = {...state.data, ...action.payload};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.orderId = '';
        state.status = 'loading';
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.orderId = action.payload.orderId;
        state.status = 'success';
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.orderId = '';
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
  }
});

export const {openModal, closeModal, clearOrder, updateOrderData} = orderSlice.actions;

export default orderSlice.reducer;