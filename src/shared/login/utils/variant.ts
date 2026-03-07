import { LoginVariant, LoginVariantConfig } from './model';

export const loginVariantConfigs: Record<LoginVariant, LoginVariantConfig> = {
  V1: {
    layout: 'split',
    showBanner: true,
    showFooter: true,
    bannerPosition: 'left',
    formPosition: 'center',
    theme: 'default'
  },
  V2: {
    layout: 'centered',
    showBanner: false,
    showFooter: false,
    bannerPosition: 'top',
    formPosition: 'center',
    theme: 'minimal'
  }
};

export const getVariantConfig = (variant: LoginVariant): LoginVariantConfig => {
  return loginVariantConfigs[variant];
};

export const getDefaultProps = (variant: LoginVariant) => {
  const config = getVariantConfig(variant);
  
  const baseProps = {
    title: 'Login',
    subtitle: 'Please log in to continue.',
    showGuestLogin: true,
    showForgotPassword: true,
    forgotPasswordText: 'Forget password',
    guestLoginText: 'Login as Guest',
    submitButtonText: 'Login',
    logoMode: 'white' as const,
  };

  if (variant === 'V1') {
    return {
      ...baseProps,
      backgroundColor: 'bg-green-600',
      formBackgroundColor: 'bg-neutral-50 dark:bg-green-900',
    };
  }

  if (variant === 'V2') {
    return {
      ...baseProps,
      backgroundColor: 'bg-white',
      formBackgroundColor: 'bg-white',
      logoMode: 'dark' as const,
    };
  }

  return baseProps;
};
