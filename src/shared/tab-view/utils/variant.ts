import { cva, VariantProps } from 'class-variance-authority';

export const TabViewVariant = cva(
  'flex flex-shrink-0 items-center gap-x-1.5 hover:cursor-pointer',
  {
    variants: {
      mode: {
        default:
          'first:rounded-l-md last:rounded-r-md border-r last:border-r-0 border-r-blue-200 py-2.5 px-8',
        transparent: 'rounded-md py-2.5 px-4',
        pill: 'rounded-md px-4 py-2.5',
        subTitle: 'px-4 py-3 min-w-[300px] rounded min-h-full',
      },
      isActive: {
        true: 'hover:bg-blue-500',
        false: 'bg-transparent hover:bg-blue-600',
      },
    },
    compoundVariants: [
      {
        mode: 'default',
        isActive: true,
        class: 'bg-blue-300',
      },
      {
        mode: 'pill',
        isActive: true,
        class: 'bg-neutral-600',
      },
      {
        mode: 'subTitle',
        isActive: true,
        class: 'bg-neutral-50',
      },
    ],
    defaultVariants: {
      isActive: false,
    },
  },
);

export const TabViewTitleVariant = cva('font-bold', {
  variants: {
    isActive: {
      true: 'text-neutral-50',
      false: 'hover:text-neutral-50 text-grey-400',
    },
  },
  defaultVariants: {
    isActive: false,
  },
});

export const TabViewHeaderContainerVariant = cva('overflow-x-auto flex items-center max-w-fit', {
  variants: {
    mode: {
      default: 'gap-0 rounded-md bg-neutral-100',
      transparent: 'gap-x-1.5',
      pill: 'gap-8 rounded-md p-2 bg-neutral-500',
      subTitle: 'gap-x-1.5 bg-neutral-500',
    },
  },
});

export const TabViewSubTitleVariant = cva('text-sm', {
  variants: {
    isActive: {
      true: '',
      false: '',
    },
  },
});

export type TabViewMode = VariantProps<typeof TabViewVariant>['mode'];
