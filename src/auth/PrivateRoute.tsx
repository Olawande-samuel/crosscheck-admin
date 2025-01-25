import { useNavigate } from 'react-router-dom';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useEffect, type PropsWithChildren } from 'react';

const PrivateRoute = ({ children }: PropsWithChildren<{}>) => {
  const navigate = useNavigate();
  const { getItem } = useLocalStorage();
  const user: IUser | null = getItem('crosscheck-admin');

  useEffect(() => {
    if (user === null) {
      navigate('/sign-in', { replace: true });
    }
    if (!user?.token) {
      navigate('/sign-in', { replace: true });
    }
  }, [user, navigate]);

  return children;
};
export default PrivateRoute;
