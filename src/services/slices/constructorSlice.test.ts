import { expect, it, describe } from '@jest/globals';
import constructorBurgerReducer, {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown
} from './constructorSlice';

const mockIngredientsMains = [
  {
    _id: '2',
    name: 'Ингредиент 2',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  },
  {
    _id: '3',
    name: 'Ингредиент 3',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    __v: 0
  }
];

const mockIngredient = {
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
  __v: 0
};

const mockIngredientBun = {
  _id: '1',
  name: 'Ингредиент 1',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0
};

describe('Проверяет работу редьюсеров слайса constructorBurger', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  it('Проверяем работу экшена addBun', () => {
    const newState = constructorBurgerReducer(
      initialState,
      addBun(mockIngredientBun)
    );

    expect(newState.bun).toEqual(mockIngredientBun);
  });

  it('Проверяем работу экшена addIngredient', () => {
    const newState = constructorBurgerReducer(
      initialState,
      addIngredient(mockIngredient)
    );
    // Проверяем что добавляется только 1 ингредиент
    expect(newState.ingredients).toHaveLength(1);

    // Проверяем, что все свойства ингредиента сохранились
    expect(newState.ingredients[0]).toMatchObject(mockIngredient);

    // Проверяем, что добавился уникальный id
    expect(newState.ingredients[0]).toHaveProperty('id');
    expect(typeof newState.ingredients[0].id).toBe('string');
  });

  it('Проверяем работу экшена removeIngredient', () => {
    const state = {
      bun: null,
      ingredients: [
        { ...mockIngredientsMains[0], id: 'id2' },
        { ...mockIngredientsMains[1], id: 'id3' }
      ]
    };

    const id = 'id3';

    const newState = constructorBurgerReducer(state, removeIngredient(id));

    const ingredientRemove = [state.ingredients[0]];

    expect(newState.ingredients).toEqual(ingredientRemove);
  });

  describe('Проверяем перемещение ингредиентов', () => {
    const state = {
      bun: null,
      ingredients: [
        { ...mockIngredientsMains[0], id: 'id1' },
        { ...mockIngredientsMains[1], id: 'id2' },
        { ...mockIngredient, id: 'id3' }
      ]
    };

    it('Проверяем работу экшена moveIngredientUp', () => {
      const newState = constructorBurgerReducer(state, moveIngredientUp(1));

      expect(newState.ingredients).toEqual([
        { ...mockIngredientsMains[1], id: 'id2' },
        { ...mockIngredientsMains[0], id: 'id1' },
        { ...mockIngredient, id: 'id3' }
      ]);
    });

    it('Проверяем работу экшена moveIngredientDown', () => {
      const newState = constructorBurgerReducer(state, moveIngredientDown(0));

      expect(newState.ingredients).toEqual([
        { ...mockIngredientsMains[1], id: 'id2' },
        { ...mockIngredientsMains[0], id: 'id1' },
        { ...mockIngredient, id: 'id3' }
      ]);
    });
  });
});
