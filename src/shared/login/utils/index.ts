export * from './model';
export * from './variant';

// Utility functions for login variants
export const validateLoginForm = (data: { username: string; password: string }): boolean => {
  return !!(data.username && data.password);
};

export const getLoginTheme = (variant: 'V1' | 'V2') => {
  const themes = {
    V1: {
      primary: 'green',
      secondary: 'neutral',
      accent: 'green-600'
    },
    V2: {
      primary: 'blue',
      secondary: 'gray',
      accent: 'blue-600'
    }
  };
  
  return themes[variant];
};

export const getResponsiveClasses = (variant: 'V1' | 'V2') => {
  const responsiveClasses = {
    V1: {
      container: 'h-screen grid grid-rows-2',
      form: 'w-[501px] h-fit',
      mobile: 'max-w-sm mx-auto'
    },
    V2: {
      container: 'min-h-screen flex items-center justify-center',
      form: 'w-full max-w-md',
      mobile: 'max-w-sm mx-4'
    }
  };
  
  return responsiveClasses[variant];
};
