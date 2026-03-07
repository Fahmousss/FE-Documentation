import { cn } from '@/core/utils/class.utils';
import { IconProps } from '@/shared/icon/types';
import { IconVariant } from '@/shared/icon/variants';
import { forwardRef } from 'react';

interface IconAccount extends IconProps {}

const IconAccount = forwardRef<SVGSVGElement, IconAccount>(
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
          d="M8.50016 9.20052C10.4562 9.20052 12.0418 7.61486 12.0418 5.65885C12.0418 3.70285 10.4562 2.11719 8.50016 2.11719C6.54415 2.11719 4.9585 3.70285 4.9585 5.65885C4.9585 7.61486 6.54415 9.20052 8.50016 9.20052Z"
          className={cn(IconVariant({ strokeMode: mode }))}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.5847 16.2826C14.5847 13.5413 11.8576 11.3242 8.50011 11.3242C5.14261 11.3242 2.41553 13.5413 2.41553 16.2826"
          className={cn(IconVariant({ strokeMode: mode }))}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
);

export default IconAccount;
