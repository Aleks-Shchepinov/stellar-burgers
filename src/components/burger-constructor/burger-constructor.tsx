import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectIngredients,
  selectOrderIsLoading,
  selectOrderData,
  selectConstructorItems,
  selectisAuthChecked
} from '../../services/selectors';
import { TIngredient, TConstructorItems } from '../../utils/types';
import { getIngredientsApi } from '../../utils/burger-api';
import { useLocation, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const { bun, ingredients = [] } = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectOrderIsLoading);
  const orderModalData = useSelector(selectOrderData);
  const isAuthChecked = useSelector(selectisAuthChecked);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const onOrderClick = () => {
    if (!bun || orderRequest) return;
    if (!isAuthChecked) {
      navigate('/login');
    }
  };
  const closeOrderModal = () => {};

  const price = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce(
      (sum: number, ingredient: TConstructorIngredient) =>
        sum + ingredient.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={{ bun, ingredients }}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
