import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import {
  orderBurgerApi,
  getOrdersApi,
  getOrderByNumberApi
} from '../../utils/burger-api';

type TOrdersState = {
  currentOrder: TOrder | null;
  userOrders: TOrder[];
  loading: boolean;
  error: string | null;
};

export const initialState: TOrdersState = {
  currentOrder: null,
  userOrders: [],
  loading: false,
  error: null
};

export const createOrder = createAsyncThunk(
  'orders/create',
  async (ingredients: string[]) => await orderBurgerApi(ingredients)
);

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async () => await getOrdersApi()
);

export const fetchOrderByNumber = createAsyncThunk(
  'orders/fetchByNumber',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders[0];
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.currentOrder = action.payload.order;
        state.loading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка в createOrder:';
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.userOrders = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка в fetchUserOrders:';
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка в fetchUserOrders:';
      });
  }
});

export const { clearCurrentOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
