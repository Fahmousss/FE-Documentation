import { cn } from '@/core/utils/class.utils';
import { forwardRef } from 'react';
import { IconProps } from './types';
import { IconVariant } from './variants';

interface IconFormula extends IconProps {}

const IconFormula = forwardRef<SVGSVGElement, IconFormula>(
  ({ mode, width, height, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? 24}
        height={height ?? 24}
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M20 4.5L18.5 3H4L13 12L4 21H18.5L20 19.5"
          className={cn(IconVariant({ strokeMode: mode }))}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
        />
      </svg>
    );
  },
);

export default IconFormula;
