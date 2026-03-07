export interface LoginFormData {
  username: string;
  password: string;
}

export interface LoginProps {
  title?: string;
  subtitle?: string;
  showGuestLogin?: boolean;
  showForgotPassword?: boolean;
  forgotPasswordText?: string;
  guestLoginText?: string;
  submitButtonText?: string;
  logoMode?: 'white' | 'dark' | 'light';
  backgroundColor?: string;
  formBackgroundColor?: string;
  onLogin?: (data: LoginFormData) => Promise<void>;
  onGuestLogin?: () => Promise<void>;
  onForgotPassword?: () => void;
  className?: string;
  customStyles?: {
    container?: string;
    form?: string;
    button?: string;
    input?: string;
  };
}

export interface LoginVariantConfig {
  layout: 'split' | 'centered' | 'full-width';
  showBanner: boolean;
  showFooter: boolean;
  bannerPosition: 'left' | 'right' | 'top' | 'bottom';
  formPosition: 'center' | 'left' | 'right';
  theme: 'default' | 'minimal' | 'modern';
}

export type LoginVariant = 'V1' | 'V2';
