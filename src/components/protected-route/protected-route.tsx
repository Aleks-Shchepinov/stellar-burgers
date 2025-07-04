import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectUser, selectUserIsLoading } from '../../services/selectors';
import { Preloader } from '@ui';

interface ProtectedRouteProps {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  onlyUnAuth = false,
  children
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector(selectUser);
  const userIsLoading = useSelector(selectUserIsLoading);
  useEffect(() => {
    if (userIsLoading) return;

    if (!onlyUnAuth && !userData) {
      navigate('/login', { state: { from: location }, replace: true });
    } else if (onlyUnAuth && userData) {
      const from = location.state?.from || '/';
      navigate(from, { replace: true });
    }
  }, [userIsLoading, userData, navigate, location, onlyUnAuth]);

  if (userIsLoading) {
    return <Preloader />;
  }

  if ((onlyUnAuth && !userData) || (!onlyUnAuth && userData)) {
    return children;
  }

  return null;
};
