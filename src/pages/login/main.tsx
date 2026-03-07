import { ACCESS_TOKEN } from '@/core/constant/config.constant';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginBanner from './components/login-banner';
import LoginFooter from './components/login-footer';
import LoginForm from './components/login-form';

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    //  delete comment this line to enable authentication check
    // if (Cookies.get(ACCESS_TOKEN)) {
    //   navigate('/');
    // }
  }, []);
  return (
    <div className="h-screen grid grid-rows-2">
      <div className="grid grid-cols-2">
        <LoginBanner />
        <LoginForm />
      </div>
      <LoginFooter />
    </div>
  );
};

export default Login;
