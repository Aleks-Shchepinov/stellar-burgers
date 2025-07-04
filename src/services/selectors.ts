import { RootState } from './store';

export const selectIngredients = (state: RootState) => state.ingredients.items;
export const selectCurrentIngredient = (state: RootState) =>
  state.ingredients.currentIngredient;
export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.loading;
export const selectUserOrders = (state: RootState) => state.orders.userOrders;
export const selectOrderIsLoading = (state: RootState) => state.orders.loading;
export const selectOrderData = (state: RootState) => state.orders.currentOrder;

export const selectConstructorItems = (state: RootState) =>
  state.constructorBurger;

export const selectFeeds = (state: RootState) => state.feeds;
export const selectFeedsOrders = (state: RootState) => state.feeds.orders;
export const selectFeedsIsLoading = (state: RootState) => state.feeds.loading;

export const selectIsAuthChecked = (state: RootState) =>
  state.auth.isAuthChecked;
export const selectUser = (state: RootState) => state.auth.user;
export const selectUserIsLoading = (state: RootState) => state.auth.loading;
export const selectUserError = (state: RootState) => state.auth.error;
