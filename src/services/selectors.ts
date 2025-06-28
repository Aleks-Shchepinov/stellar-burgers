import { TIngredient } from '@utils-types';
import { RootState } from './store';
import { Root } from 'react-dom/client';

export const selectIngredients = (state: RootState) => state.ingredients.items;
export const selectOrderIsLoading = (state: RootState) => state.orders.loading;
export const selectOrderData = (state: RootState) => state.orders.currentOrder;

export const selectConstructorItems = (state: RootState) => state.constructor;
export const selectConstructorBun = (state: RootState) => state.constructor.bun;
export const selectConstructorIngredients = (state: RootState) =>
  state.constructor.ingredients;

export const selectIngredientCount =
  (ingredientId: string) => (state: RootState) => {
    const { bun, ingredients } = state.constructor;

    if (bun?._id === ingredientId) return 2;

    return ingredients.filter((item) => item._id === ingredientId).length;
  };

export const selectIngredientsData = (state: RootState) => {
  state.ingredients;
};
export const selectBuns = (state: RootState) =>
  state.ingredients.items.filter((item: TIngredient) => item.type === 'bun');
export const selectMains = (state: RootState) =>
  state.ingredients.items.filter((item: TIngredient) => item.type === 'main');
export const selectSauces = (state: RootState) =>
  state.ingredients.items.filter((item) => item.type === 'sauce');

export const selectFeeds = (state: RootState) => state.feeds;

export const selectCurrentIngredient = (state: RootState) =>
  state.ingredients.currentIngredient;

export const selectisAuthChecked = (state: RootState) =>
  state.auth.isAuthChecked;
