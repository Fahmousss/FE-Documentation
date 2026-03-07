import { cva } from 'class-variance-authority';

export const BackgroundVariants = cva(
  'bg-neutral-100 rounded',
);

export const CommonTextColorVariants = cva('text-gray-800');

export const CommonReadOnlyInputVariants = cva(
  'w-full border-0 bg-grey-800 hover:bg-grey-800 text-blue-700 flex items-center text-lg font-semibold hover:cursor-pointer',
);
