// variants/alert-variants.ts
import { cva } from 'class-variance-authority';

export const AlertVariants = cva('p-4 rounded-lg border transition-all duration-200 ease-in-out', {
  variants: {
    mode: {
      default: ['bg-blue-50 border-blue-200 text-blue-800'],
      success: ['bg-green-50 border-green-200 text-green-600'],
      warning: ['bg-yellow-50 border-yellow-200 text-yellow-800'],
      error: ['bg-red-50 border-red-200 text-red-800'],
      danger: ['bg-red-50 border-red-200 text-red-800'],
    },
  },
  defaultVariants: {
    mode: 'default',
  },
});

export const AlertTextVariants = cva('transition-colors duration-200', {
  variants: {
    mode: {
      default: ['text-blue-800'],
      success: ['text-green-700'],
      warning: ['text-yellow-800'],
      error: ['text-red-800'],
      danger: ['text-red-800'],
    },
  },
  defaultVariants: {
    mode: 'default',
  },
});
