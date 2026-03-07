import { Navigate } from 'react-router-dom';

const AuthRedirect = () => {
  const token = true;
  if (token) {
    return <Navigate to="/product" replace />;
  }
  return <Navigate to="/login" replace />;
};

export default AuthRedirect;
