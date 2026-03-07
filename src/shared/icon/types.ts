import { IconVariant } from '@/shared/icon/variants';
import { VariantProps } from 'class-variance-authority';
import { SVGProps } from 'react';

export interface IconProps
  extends Omit<SVGProps<SVGSVGElement>, 'mode'>,
    VariantProps<typeof IconVariant> {
  width?: number;
  height?: number;
}

export interface IconWrapperProps extends Omit<IconProps, 'mode' | 'strokeMode'> {}
