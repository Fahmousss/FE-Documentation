import { cva } from 'class-variance-authority';

export const BadgeVariant = cva(
  'w-fit flex items-center gap-1 rounded-md border font-bold py-0.5',
  {
    variants: {
      theme: {
        grey: 'bg-neutral-500 border-grey-100 text-grey-800',
        danger: 'bg-red-50 border-red-200 text-red-500',
        yellow:
          'bg-yellow-100 border-yellow-300 text-yellow-800',
        green:
          'bg-green-50 border-green-300 text-green-700',
        blue: 'bg-blue-100 border-blue-400 text-blue-700',
        indigo:
          'bg-violet-100 border-violet-300 text-violet-700',
      },
      size: {
        small: 'px-2.5 text-md',
        large: 'px-4 text-lg',
      },
    },
    defaultVariants: {
      theme: 'grey',
      size: 'small',
    },
  },
);
