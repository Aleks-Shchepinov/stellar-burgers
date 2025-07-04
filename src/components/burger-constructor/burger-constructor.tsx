import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectOrderIsLoading,
  selectOrderData,
  selectUser,
  selectConstructorItems
} from '../../services/selectors';
import { clearConstructor } from '../../services/slices/constructorSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  clearCurrentOrder,
  createOrder
} from '../../services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
  const { bun, ingredients = [] } = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectOrderIsLoading);
  const orderModalData = useSelector(selectOrderData);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!bun || orderRequest) return;

    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }

    const ingredientsIds = [
      bun._id,
      ...ingredients.map((ingredient) => ingredient._id),
      bun._id
    ];

    dispatch(createOrder(ingredientsIds));
  };

  const closeOrderModal = () => {
    dispatch(clearConstructor());
    dispatch(clearCurrentOrder());
  };

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
