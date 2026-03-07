import { VariantProps } from 'class-variance-authority';
import { HTMLAttributes } from 'react';
import { BadgeVariant } from './variants';

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof BadgeVariant> {
  icon?: boolean;
  label?: string;
  onXClick?: () => void;
}
