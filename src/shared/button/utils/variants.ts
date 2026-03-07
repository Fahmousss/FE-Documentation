import { cva } from 'class-variance-authority';

export const ButtonVariants = cva(
  'flex items-center justify-center gap-2 rounded-md font-bold text-neutral-50 transition-colors',
  {
    variants: {
      size: {
        small: `min-w-fit w-fit h-fit px-4 py-2 text-sm`,
        medium: `min-w-fit w-fit h-fit px-6 py-3 text-base`,
        large: `min-w-fit w-fit h-fit px-8 py-4 text-lg`,
        icon: 'min-w-6 h-6',
      },
      variant: {
        password: `bg-red-100 enabled:hover:bg-red-200 border-2 border-red-500 font-bold text-red-500`,
        primary: `bg-green-500 enabled:hover:bg-green-700 enabled:active:bg-green-600 disabled:bg-green-200 disabled:opacity-65`,
        secondary: `bg-neutral-50 text-grey-500 border border-grey-200 hover:bg-neutral-200 active:bg-neutral-300 disabled:opacity-65`,
        success: `bg-green-500 enabled:hover:bg-green-700 enabled:active:bg-green-600 disabled:bg-green-200 disabled:opacity-65`,
        danger: `bg-red-500 enabled:hover:bg-red-600 enabled:active:bg-red-600 disabled:bg-red-400 disabled:opacity-65`,
        warning: `bg-yellow-500 enabled:hover:bg-yellow-700 enabled:active:bg-yellow-600 disabled:bg-yellow-400 disabled:opacity-65`,
        info: `bg-blue-500 enabled:hover:bg-blue-500 enabled:active:bg-blue-600 disabled:bg-blue-400 disabled:opacity-65`,
        link: `bg-transparent text-blue-500 enabled:hover:underline enabled:active:no-underline disabled:text-gray-300 disabled:opacity-65`,
        'outline-primary': `bg-green-100 border-2 border-green-500 text-green-500 enabled:hover:bg-green-200 enabled:hover:text-white-50 enabled:active:bg-green-700 enabled:active:text-white-50 disabled:border-green-800 disabled:text-green-800 disabled:opacity-65`,
        'outline-secondary': `bg-transparent border-2 border-grey-400 text-grey-400 enabled:hover:bg-grey-700 enabled:hover:text-white-50 enabled:hover:border-grey-500 enabled:active:bg-grey-600 enabled:hover:text-white-50 enabled:active:border-none disabled:border-grey-500 disabled:text-grey-500 disabled:opacity-65`,
        'outline-danger': `bg-transparent border-2 border-red-500 text-red-500 enabled:hover:bg-red-700 enabled:hover:text-white-50 enabled:hover:border-none enabled:active:bg-red-600 enabled:hover:text-white-50 enabled:hover:border-none disabled:border-red-500 disabled:text-red-500 disabled:opacity-65`,
        'outline-warning': `bg-transparent border-2 border-yellow-500 text-yellow-500 enabled:hover:bg-yellow-700 enabled:hover:text-white-50 enabled:hover:border-none enabled:active:bg-yellow-600 enabled:hover:text-white-50 enabled:hover:border-none disabled:border-yellow-700 disabled:text-yellow-700 disabled:opacity-65`,
        'outline-info': `bg-transparent border-2 border-blue-500 text-blue-500 enabled:hover:bg-blue-700 enabled:hover:text-white-50 enabled:hover:border-none enabled:active:bg-blue-600 enabled:hover:text-white-50 enabled:hover:border-none disabled:border-blue-700 disabled:text-blue-700 disabled:opacity-65`,
        transparent: `bg-transparent enabled:hover:bg-transparent enabled:active:bg-transparent disabled:bg-transparent disabled:opacity-65`,
      },
    },
    defaultVariants: {
      size: 'small',
      variant: 'primary',
    },
  },
);
