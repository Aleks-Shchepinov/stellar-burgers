import { describe, expect, it } from '@jest/globals';
import feedsReducer, {
  fetchFeeds,
  initialState
} from './feedSlice';
import { TOrder } from '../../utils/types';

describe('Проверка feedSlice reducer', () => {
  const mockOrders: TOrder[] = [
    {
      _id: '1',
      ingredients: ['60d3b41abdacab0026a733c6', '60d3b41abdacab0026a733c7'],
      status: 'done',
      name: 'Space флюоресцентный бургер',
      createdAt: '2023-04-05T12:00:00.000Z',
      updatedAt: '2023-04-05T12:00:30.000Z',
      number: 12345
    },
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

  const mockFeedsResponse = {
    success: true,
    orders: mockOrders,
    total: 100,
    totalToday: 10
  };

  it('Тест должен обрабатывать начальное состояние', () => {
    expect(feedsReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  describe('Обрабатывает экшены fetchFeeds', () => {
    it('Проверяет установку состояния загрузки в true в режиме pending', () => {
      const state = feedsReducer(
        initialState,
        fetchFeeds.pending('pending', undefined)
      );

      expect(state).toEqual({
        ...initialState,
        loading: true,
        error: null
      });
    });

    it('Проверяет установку данных ленты и завершение загрузки в режиме fulfilled', () => {
      const previousState = {
        ...initialState,
        loading: true
      };

      const state = feedsReducer(
        previousState,
        fetchFeeds.fulfilled(mockFeedsResponse, 'fulfilled', undefined)
      );

      expect(state).toEqual({
        ...initialState,
        orders: mockOrders,
        total: mockFeedsResponse.total,
        totalToday: mockFeedsResponse.totalToday,
        loading: false,
        error: null
      });
    });

    it('Проверяет установку ошибки и завершение загрузки в режиме rejected', () => {
      const errorMessage = 'Network Error';
      const previousState = {
        ...initialState,
        loading: true
      };

      const state = feedsReducer(
        previousState,
        fetchFeeds.rejected(
          new Error(errorMessage),
          'rejected',
          undefined
        )
      );

      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: errorMessage
      });
    });
  });
});
