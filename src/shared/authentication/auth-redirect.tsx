import { ACCESS_TOKEN } from '@/core/constant/config.constant';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const AuthRedirect = () => {
  const token = Cookies.get(ACCESS_TOKEN);
  if (token) {
    return <Navigate to="/product" replace />;
  }
  return <Navigate to="/login" replace />;
};

export default AuthRedirect;

