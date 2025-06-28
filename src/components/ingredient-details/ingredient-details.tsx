import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { selectCurrentIngredient } from '../../services/selectors';
import { useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  const ingredientData = useSelector(selectCurrentIngredient);
  /** TODO: взять переменную из стора */

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
