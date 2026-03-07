import LoginVariant1 from './components/variant-1';
import LoginVariant2 from './components/variant-2';

// Export individual variants
export const Login = {
  V1: LoginVariant1,
  V2: LoginVariant2
};

// Export types
export type { LoginProps } from './utils/model';

// Export utilities
export * from './hooks/use-login';
export * from './utils';

// Default export (V1 for backward compatibility)
export default LoginVariant1;
