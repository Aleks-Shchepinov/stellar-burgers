import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import authReducer from './slices/AuthSlice';
import ingredientsReducer from './slices/ingrediensSlice';
import ordersReducer from './slices/orderSlice';
import feedsReducer from './slices/feedSlice';
import constructorBurgerReducer from './slices/constructorSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  ingredients: ingredientsReducer,
  orders: ordersReducer,
  feeds: feedsReducer,
  constructorBurger: constructorBurgerReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
