import { describe, expect, it } from '@jest/globals';
import ordersReducer, {
  createOrder,
  fetchUserOrders,
  fetchOrderByNumber,
  clearCurrentOrder,
  initialState
} from './orderSlice';
import { TOrder } from '@utils-types';

describe('Проверка ordersSlice reducer', () => {
  const mockOrder: TOrder = {
    _id: '1',
    ingredients: ['60d3b41abdacab0026a733c6', '60d3b41abdacab0026a733c7'],
    status: 'done',
    name: 'Space флюоресцентный бургер',
    createdAt: '2023-04-05T12:00:00.000Z',
    updatedAt: '2023-04-05T12:00:30.000Z',
    number: 12345
  };

  const mockUserOrders: TOrder[] = [
    mockOrder,
    {
      _id: '2',
      ingredients: ['60d3b41abdacab0026a733c8'],
      status: 'pending',
      name: 'Метеоритный бургер',
      createdAt: '2023-04-06T12:00:00.000Z',
      updatedAt: '2023-04-06T12:00:30.000Z',
      number: 12346
    }
  ];

  it('Тест должен обрабатывать начальное состояние', () => {
    expect(ordersReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('Обрабатывает экшены clearCurrentOrder', () => {
    it('Должен очищать currentOrder', () => {
      const stateWithOrder = {
        ...initialState,
        currentOrder: mockOrder
      };

      const state = ordersReducer(stateWithOrder, clearCurrentOrder());
      expect(state.currentOrder).toBeNull();
    });
  });

  describe('Обрабатывает экшены createOrder', () => {
    it('Проверяет установку состояния загрузки в true в режиме pending', () => {
      const state = ordersReducer(
        initialState,
        createOrder.pending('pending', [])
      );
      expect(state).toEqual({
        ...initialState,
        loading: true,
        error: null
      });
    });

    it('Проверяет установку currentOrder и завершение загрузки в режиме fulfilled', () => {
      const previousState = {
        ...initialState,
        loading: true
      };

      const apiResponse = {
        success: true,
        order: mockOrder,
        name: 'Space флюоресцентный бургер'
      };

      const state = ordersReducer(
        previousState,
        createOrder.fulfilled(apiResponse, 'fulfilled', [])
      );

      expect(state).toEqual({
        ...initialState,
        currentOrder: mockOrder,
        loading: false,
        error: null
      });
    });

    it('Проверяет установку ошибки и завершение загрузки в режиме rejected', () => {
      const errorMessage = 'Create order failed';
      const previousState = {
        ...initialState,
        loading: true
      };

      const state = ordersReducer(
        previousState,
        createOrder.rejected(new Error(errorMessage), 'rejected', [])
      );

      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: errorMessage
      });
    });
  });

  describe('Обрабатывает экшены fetchUserOrders', () => {
    it('Проверяет установку состояния загрузки в true в режиме pending', () => {
      const state = ordersReducer(
        initialState,
        fetchUserOrders.pending('pending', undefined)
      );
      expect(state).toEqual({
        ...initialState,
        loading: true,
        error: null
      });
    });

    it('Проверяет установку userOrders и завершение загрузки в режиме fulfilled', () => {
      const previousState = {
        ...initialState,
        loading: true
      };

      const state = ordersReducer(
        previousState,
        fetchUserOrders.fulfilled(mockUserOrders, 'fulfilled', undefined)
      );

      expect(state).toEqual({
        ...initialState,
        userOrders: mockUserOrders,
        loading: false,
        error: null
      });
    });

    it('Проверяет установку ошибки и завершение загрузки в режиме rejected', () => {
      const errorMessage = 'Fetch orders failed';
      const previousState = {
        ...initialState,
        loading: true
      };

      const state = ordersReducer(
        previousState,
        fetchUserOrders.rejected(new Error(errorMessage), 'rejected', undefined)
      );

      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: errorMessage
      });
    });
  });

  describe('Обрабатывает экшены fetchOrderByNumber', () => {
    it('Проверяет установку состояния загрузки в true в режиме pending', () => {
      const state = ordersReducer(
        initialState,
        fetchOrderByNumber.pending('pending', 12345)
      );
      expect(state).toEqual({
        ...initialState,
        loading: true,
        error: null
      });
    });

    it('Проверяет установку currentOrder и завершение загрузки в режиме fulfilled', () => {
      const previousState = {
        ...initialState,
        loading: true
      };

      const state = ordersReducer(
        previousState,
        fetchOrderByNumber.fulfilled(mockOrder, 'fulfilled', 12345)
      );

      expect(state).toEqual({
        ...initialState,
        currentOrder: mockOrder,
        loading: false,
        error: null
      });
    });

    it('Проверяет установку ошибки и завершение загрузки в режиме rejected', () => {
      const errorMessage = 'Order not found';
      const previousState = {
        ...initialState,
        loading: true
      };

      const state = ordersReducer(
        previousState,
        fetchOrderByNumber.rejected(new Error(errorMessage), 'rejected', 12345)
      );

      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: errorMessage
      });
    });
  });
});
