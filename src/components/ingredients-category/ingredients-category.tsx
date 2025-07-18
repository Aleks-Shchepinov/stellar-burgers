import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TConstructorIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { selectConstructorItems } from '../../services/selectors';
import { useSelector } from '../../services/store';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps & { 'data-cy'?: string }
>(({ title, titleRef, ingredients, 'data-cy': dataCy }, ref) => {
  const constructorState = useSelector(selectConstructorItems);
  const { bun, ingredients: constructorIngredients = [] } =
    constructorState || {};

  const ingredientsCounters = useMemo(() => {
    const counters: { [key: string]: number } = {};

    if (constructorIngredients && Array.isArray(constructorIngredients)) {
      constructorIngredients.forEach((ingredient: TConstructorIngredient) => {
        if (ingredient?._id) {
          counters[ingredient._id] = (counters[ingredient._id] || 0) + 1;
        }
      });
    }

    if (bun?._id) {
      counters[bun._id] = 2;
    }

    return counters;
  }, [bun, constructorIngredients]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
      data-cy={dataCy}
    />
  );
});
