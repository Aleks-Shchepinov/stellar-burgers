import { describe, expect, it } from '@jest/globals';
import ingredientsReducer, {
  fetchIngredients,
  initialState
} from './ingrediensSlice';
import { TIngredient } from '../../utils/types';

describe('Проверка ingredientsSlice reducer', () => {
  const mockIngredients: TIngredient[] = [
    {
      _id: '6',
      name: 'Мясо бессмертных моллюсков Protostomia',
      type: 'main',
      proteins: 433,
      fat: 244,
      carbohydrates: 33,
      calories: 420,
      price: 1337,
      image: 'https://code.s3.yandex.net/react/code/meat-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
    },
    {
      _id: '7',
      name: 'Говяжий метеорит (отбивная)',
      type: 'main',
      proteins: 800,
      fat: 800,
      carbohydrates: 300,
      calories: 2674,
      price: 3000,
      image: 'https://code.s3.yandex.net/react/code/meat-04.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
    }
  ];

  it('Тест должен обрабатывать начальное состояние', () => {
    expect(ingredientsReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  describe('Обрабатывает экшены fetchIngredients', () => {
    it('Проверяет установку состаяния загрузки в true в режиме pending', () => {
      const state = ingredientsReducer(
        initialState,
        fetchIngredients.pending('pending', undefined)
      );

      expect(state).toEqual({
        ...initialState,
        loading: true,
        error: null
      });
    });

    it('Проверяет установку состаяния загрузки в false и загрузку ингредиентов в режиме fulfilled', () => {
      const previousState = {
        ...initialState,
        loading: true
      };

      const state = ingredientsReducer(
        previousState,
        fetchIngredients.fulfilled(mockIngredients, 'fulfilled', undefined)
      );

      expect(state).toEqual({
        ...initialState,
        items: mockIngredients,
        loading: false,
        error: null
      });
    });

    it('Проверяет установку состаяния загрузки в false и возвращение ошибки в режиме rejected', () => {
      const errorMessage = 'Network Error';
      const previousState = {
        ...initialState,
        loading: true
      };

      const state = ingredientsReducer(
        previousState,
        fetchIngredients.rejected(
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
