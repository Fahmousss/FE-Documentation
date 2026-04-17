import EyeSlash from '@/assets/icons/eye-slash.svg';
import Eye from '@/assets/icons/eye.svg';
import useAuth from '@/core/hooks/use-auth';
import useColor from '@/core/hooks/use-color';
import FormLabel from '@/shared/form/label';
import Typography from '@/shared/typography';
import { Form, Input } from 'antd';
import { Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AstemoLogo from '../assets/astemo.svg';
import ElementLogin from '../assets/element.svg';
import { LoginFormData, LoginProps } from '../utils/model';

const LoginVariant1 = ({
  title = 'ASTEMO LINE PRODUCTION',
  subtitle = 'Enter your username and password to continue',
  showGuestLogin = false,
  guestLoginText = 'Login as Guest',
  submitButtonText = 'LOG IN',
  formBackgroundColor = 'bg-white',
  onLogin,
  onGuestLogin,
  customStyles = {},
}: LoginProps) => {
  const { colorList } = useColor();
  const [form] = Form.useForm<LoginFormData>();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (data: LoginFormData) => {
    if (onLogin) {
      await onLogin(data);
    } else {
      await login({ email: data.email, password: data.password });
      navigate('/');
    }
  };

  const handleGuestLogin = async () => {
    if (onGuestLogin) {
      await onGuestLogin();
    } else {
      await login({ email: 'guest', password: 'guest' });
      navigate('/');
    }
  };

  const onFinish = (values: LoginFormData) => {
    handleLogin(values);
  };

  return (
    <div>
      {/* Main Layout */}
      <div
        style={{
          background: `${colorList.bg} url(${ElementLogin}) no-repeat center center`,
          backgroundSize: 'cover',
        }}
        className="flex flex-col items-center pb-14 justify-center min-h-screen"
      >
        <div
          className={`w-full flex flex-col gap-5 max-w-md ${formBackgroundColor} rounded-2xl shadow-2xl p-6 ${customStyles.form || ''}`}
        >
          {/* Logo Section */}
          <div className="flex flex-col gap-6 justify-center items-center">
            <img className="w-48 -mb-4" src={AstemoLogo} alt="" />
            <Typography.Display3
              style={{
                color: colorList['text-primary'],
                fontWeight: 700,
              }}
            >
              {title}
            </Typography.Display3>
            <Typography.H3
              style={{
                color: colorList['text-secondary'],
                fontWeight: 400,
              }}
              className="-mt-5"
            >
              {subtitle}
            </Typography.H3>
          </div>

          {/* Form Section */}
          <Form form={form} layout="vertical" onFinish={onFinish} className="space-y-2">
            <Form.Item name="email" label={<FormLabel label="Email" />}>
              <Input
                className={`h-10 rounded-lg bg-neutral-50 border-gray-300 ${customStyles.input || ''}`}
                size="middle"
                placeholder="Input Email"
                prefix={<User size={19} className="text-gray-400 mr-0.5" />}
              />
            </Form.Item>

            <Form.Item name="password" label={<FormLabel label="Password" />}>
              <Input.Password
                iconRender={(visible) =>
                  visible ? (
                    <img src={Eye} className="cursor-pointer w-5 h-5" />
                  ) : (
                    <img src={EyeSlash} className="cursor-pointer w-5 h-5" />
                  )
                }
                type="password"
                className={`h-10 rounded-lg bg-neutral-50 ${customStyles.input || ''}`}
                placeholder="Input Password"
                size="middle"
                prefix={<Lock size={19} className="text-gray-400 mr-1" />}
              />
            </Form.Item>

            {showGuestLogin && (
              <Typography.H4
                style={{
                  color: colorList.success,
                  marginTop: '22px',
                  textAlign: 'center',
                }}
                className="cursor-pointer hover:underline w-fit text-center mx-auto"
              >
                {guestLoginText}
              </Typography.H4>
            )}

            <Form.Item>
              <button
                type="submit"
                className={`w-full bg-green-600 mt-3 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 uppercase ${customStyles.button || ''}`}
              >
                {submitButtonText}
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>

      {/* Footer */}
      <Typography.H5
        style={{
          margin: 0,
          position: 'absolute',
          background: colorList.card,
          color: colorList['text-primary'],
          width: '100%',
          borderTop: `1px solid ${colorList['border']}`,
          fontWeight: 400,
          padding: '12px 20px',
          bottom: 0,
          textAlign: 'right',
        }}
      >
        Copyright © 2025 PT. Electrindo Inti Dinamika
      </Typography.H5>
    </div>
  );
};

export default LoginVariant1;
