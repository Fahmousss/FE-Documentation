import { cva } from 'class-variance-authority';

export const BreadcrumbVariants = cva('w-fit z-50 flex items-center gap-3  ', {
  variants: {
    bordered: {
      true: 'py-2 pl-4 bg-neutral-100  ',
      false: 'bg-transparent',
    }, 
  },
  defaultVariants: {
    bordered: true,
  },
});

export const BreadcrumbItemVariants = cva('font-[400] font-sans', {
  variants: {
    active: {
      true: 'text-[#01A75A]',
      false: 'text-neutral-800 hover:underline',
    },
    bordered: {
      true: ' ',
      false: '',
    },
  },
  defaultVariants: {
    active: false,
    bordered: true,
  },
});
