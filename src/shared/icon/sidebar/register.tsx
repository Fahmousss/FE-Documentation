import { cn } from '@/core/utils/class.utils';
import { IconProps } from '@/shared/icon/types';
import { IconVariant } from '@/shared/icon/variants';
import { forwardRef } from 'react';

interface IconRegister extends IconProps {}

const IconRegister = forwardRef<SVGSVGElement, IconRegister>(
  ({ mode, width, height, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? 17}
        height={height ?? 18}
        viewBox="0 0 17 18"
        fill="none"
      >
        <path
          d="M6.37484 15.8854H10.6248C14.1665 15.8854 15.5832 14.4687 15.5832 10.9271V6.67708C15.5832 3.13542 14.1665 1.71875 10.6248 1.71875H6.37484C2.83317 1.71875 1.4165 3.13542 1.4165 6.67708V10.9271C1.4165 14.4687 2.83317 15.8854 6.37484 15.8854Z"
          className={cn(IconVariant({ strokeMode: mode }))}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.1562 6.67578H5.84375"
          className={cn(IconVariant({ strokeMode: mode }))}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.1562 10.9258H5.84375"
          className={cn(IconVariant({ strokeMode: mode }))}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
);

export default IconRegister;
