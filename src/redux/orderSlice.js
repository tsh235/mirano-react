// rxslice и таб раскрывает структуру
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { clearCart, closeCart, fetchCart } from './cartSlice.js';
import { API_URL } from '../const.js';

export const sendOrder = createAsyncThunk('order/sendOrder', async (_, {getState, dispatch}) => {
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
    throw new Error('Не удалось отправить заказ');
  }

  dispatch(clearOrder());
  dispatch(closeCart());
  dispatch(clearCart());
  dispatch(fetchCart());

  return await response.json();
});

const initialState = {
  isOpen: false,
  orderId: '',
  status: 'idle',
  data: {
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
    builder // ! Todo
      .addCase(sendOrder.pending, (state) => {
        state.status = 'sending';
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.status = 'success';
        state.orderId = action.payload.orderId;
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
});

export const {openModal, closeModal, clearOrder, updateOrderData} = orderSlice.actions;

export default orderSlice.reducer;