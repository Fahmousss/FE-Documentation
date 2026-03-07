import { cva } from 'class-variance-authority';

export const listVariants = cva(
  'w-full relative flex items-center gap-2 rounded-sm transition-all duration-300',
  {
    variants: {
      isOpen: {
        true: 'w-full',
        false: 'w-[60px]',
      },
    },
  },
);

export const listDropdownVariants = cva(
  'w-full relative flex items-center gap-2 rounded-sm transition-all duration-300',
  {
    variants: {
      isActive: {
        true: 'bg-grey-50 text-grey-300',
        false: 'text-grey-300',
      },
      isOpen: {
        true: 'w-full',
        false: 'w-[60px]',
      },
    },
    defaultVariants: {
      isActive: false,
    },
  },
);

export const listChildVariants = cva(
  'transition-all duration-300 font-normal',
  {
    variants: {
      isOpen: {
        true: 'opacity-100',
        false: 'opacity-0',
      },
      isActive: {
        true: '',
        false: '',
      },
    },
  },
);

export const DropdownVariants = cva(
  'w-full grid overflow-hidden transition-all duration-300 ease-in-out',
  {
    variants: {
      show: {
        true: 'grid-rows-[1fr] opacity-100',
        false: 'grid-rows-[0fr] opacity-0',
      },
    },
  },
);

export const HoverMode = cva('', {
  variants: {
    mode: {
      primary: 'group hover:cursor-pointer hover:bg-neutral-200',
      danger: 'group hover:cursor-pointer hover:bg-red-100',
      warning: 'group hover:cursor-pointer hover:bg-yellow-100',
      info: 'group hover:cursor-pointer hover:bg-blue-100',
      default: 'group hover:cursor-pointer hover:bg-grey-100',
    },
  },
});
