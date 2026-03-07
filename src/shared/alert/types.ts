import { VariantProps } from 'class-variance-authority';
import { HTMLAttributes } from 'react';
import { AlertVariants } from './variants';

export interface AlertProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof AlertVariants> {
  title: string;
  message?: string;
  action?: () => void;
  onClose: () => void;
}
