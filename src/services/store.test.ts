import { rootReducer } from './store';
import { initialState as authInitialState } from './slices/AuthSlice';
import { initialState as ingredientsInitialState } from './slices/ingrediensSlice';
import { initialState as ordersInitialState } from './slices/orderSlice';
import { initialState as feedsInitialState } from './slices/feedSlice';
import { initialState as constructorInitialState } from './slices/constructorSlice';

describe('Тестирование rootReducer', () => {
  it('должен возвращать корректное начальное состояние для неизвестного экшена', () => {
    const testedInitialState = {
      auth: authInitialState,
      ingredients: ingredientsInitialState,
      orders: ordersInitialState,
      feeds: feedsInitialState,
      constructorBurger: constructorInitialState
    };

    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual(testedInitialState);
  });

  it('должен содержать все необходимые редьюсеры', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    
    // Проверяем наличие всех ключей
    expect(state).toHaveProperty('auth');
    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('orders');
    expect(state).toHaveProperty('feeds');
    expect(state).toHaveProperty('constructorBurger');
    
    // Проверяем, что состояние каждого редьюсера инициализировано правильно
    expect(state.auth).toEqual(authInitialState);
    expect(state.ingredients).toEqual(ingredientsInitialState);
    expect(state.orders).toEqual(ordersInitialState);
    expect(state.feeds).toEqual(feedsInitialState);
    expect(state.constructorBurger).toEqual(constructorInitialState);
  });
});
