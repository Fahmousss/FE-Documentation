import Logo from '@/shared/icon/logo';

const LoginBanner = () => {
  return (
    <div className="bg-green-600 h-full">
      <div className="h-[98vh] flex flex-col justify-center gap-6 px-12">
        <Logo mode={'white'} />
      </div>
    </div>
  );
};

export default LoginBanner;
