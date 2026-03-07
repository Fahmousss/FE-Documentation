import EyeSlash from '@/assets/icons/eye-slash.svg';
import Eye from '@/assets/icons/eye.svg';
import useAuth from '@/core/hooks/use-auth';
import FormLabel from '@/shared/form/label';
import { Card, Form, Input } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginFormData, LoginProps } from '../utils/model';

const LoginVariant2 = ({
  title = 'Welcome Back',
  subtitle = 'Sign in to your account to continue',
  showGuestLogin = true,
  showForgotPassword = true,
  forgotPasswordText = 'Forgot your password?',
  guestLoginText = 'Continue as Guest',
  submitButtonText = 'Sign In',
  logoMode = 'dark',
  backgroundColor = 'bg-gradient-to-br from-blue-50 to-indigo-100',
  formBackgroundColor = 'bg-white',
  onLogin,
  onGuestLogin,
  onForgotPassword,
  className = '',
  customStyles = {}
}: LoginProps) => {
  const [form] = Form.useForm<LoginFormData>();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    // delete comment this line to enable authentication check
    // if (Cookies.get(ACCESS_TOKEN)) {
    //   navigate('/');
    // }
  }, []);

  const handleLogin = async (data: LoginFormData) => {
    if (onLogin) {
      await onLogin(data);
    } else {
      await login({ username: data.username, password: data.password });
      navigate('/');
    }
  };

  const handleGuestLogin = async () => {
    if (onGuestLogin) {
      await onGuestLogin();
    } else {
      await login({ username: 'guest', password: '' });
      navigate('/');
    }
  };

  const handleForgotPassword = () => {
    if (onForgotPassword) {
      onForgotPassword();
    }
  };

  const onFinish = (values: LoginFormData) => {
    handleLogin(values);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${backgroundColor} ${className} ${customStyles.container || ''}`}>
      <div className="w-full max-w-md">
        <Card 
          className={`shadow-2xl border-0 rounded-2xl ${customStyles.form || ''}`}
          bodyStyle={{ padding: '2rem' }}
        >
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="mb-6">
              {/* <Logo mode={logoMode} /> */}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
            <p className="text-gray-600">{subtitle}</p>
          </div>

          {/* Form Section */}
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="space-y-6"
          >
            <Form.Item
              required
              name="username"
              label={<FormLabel className="text-gray-700 font-medium" label="Email Address" />}
            >
              <Input
                required
                className={`h-12 rounded-lg ${customStyles.input || ''}`}
                size="large"
                placeholder="Enter your email address"
              />
            </Form.Item>
            
            <Form.Item
              required
              name="password"
              label={<FormLabel className="text-gray-700 font-medium" label="Password" />}
            >
              <Input.Password
                iconRender={(visible) =>
                  visible ? (
                    <img src={Eye} className="cursor-pointer" />
                  ) : (
                    <img src={EyeSlash} className="cursor-pointer" />
                  )
                }
                type="password"
                className={`h-12 rounded-lg ${customStyles.input || ''}`}
                placeholder="Enter your password"
                required
                size="large"
              />
            </Form.Item>
            
            <div className="flex items-center justify-between">
              {showForgotPassword && (
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  onClick={handleForgotPassword}
                >
                  {forgotPasswordText}
                </button>
              )}
            </div>
            
            <Form.Item className="mb-0">
              <button
                type="submit"
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ${customStyles.button || ''}`}
              >
                {submitButtonText}
              </button>
            </Form.Item>
          </Form>

          {/* Guest Login Section */}
          {showGuestLogin && (
            <div className="mt-6 text-center">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleGuestLogin}
                className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition duration-200"
              >
                {guestLoginText}
              </button>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-gray-500">
            Copyright © 2024 PT. Electrindo Inti Dinamika
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginVariant2;
