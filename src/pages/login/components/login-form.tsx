import EyeSlash from '@/assets/icons/eye-slash.svg';
import Eye from '@/assets/icons/eye.svg';
import useAuth from '@/core/hooks/use-auth';
import FormLabel from '@/shared/form/label';
import { Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [form] = Form.useForm<{ username: string; password: string }>();
  const navigate = useNavigate();
  // const { login } = useAuth();

  // const onFinish = ({ username, password }: { username: string; password: string }) => {
  //   login({ username: username, password: password }).then(() => {
  //     navigate('/');
  //   });
  // };

  // const handleLoginAsGuest = () => {
  //   login({ username: 'guest', password: '' }).then(() => {
  //     navigate('/');
  //   });
  // };

  return (
    <div className="bg-neutral-50 h-[98vh] flex justify-center items-center">
      <div className="w-[501px] h-fit">
        <h3 className="text-[54px] font-extrabold text-grey-500">Login</h3>
        <p className="text-grey-100 text-[16px]">Please log in to continue.</p>
        <Form
          form={form}
          layout="vertical"
          // onFinish={onFinish}
          className="flex flex-col gap-3 my-7"
        >
          <Form.Item
            required
            name={'username'}
            label={<FormLabel className="text-grey-500" label="Email/Username" />}
          >
            <Input
              required
              className=""
              size="large"
              placeholder="Enter your email address or username"
            />
          </Form.Item>
          <Form.Item
            required
            name={'password'}
            label={<FormLabel className="text-grey-500" label="Password" />}
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
              className=""
              placeholder="Enter your password"
              required
              size="large"
            />
          </Form.Item>
          <div className="flex items-center justify-between">
            <p
              className="cursor-pointer text-green-600 font-semibold text-md underline"
              // onClick={handleLoginAsGuest}
            >
              Login as Guest
            </p>
            <p className="text-grey-100">Forget password</p>
          </div>
          <div className="py-5">
            <button
              type="submit"
              className="w-full text-white rounded-md bg-green-600 hover:bg-green-700 h-[45px] text-[20px]"
            >
              Login
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
