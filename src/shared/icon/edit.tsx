import { cn } from '@/core/utils/class.utils';
import { IconProps } from '@/shared/icon/types';
import { IconVariant } from '@/shared/icon/variants';
import { forwardRef } from 'react';

interface IconEdit extends IconProps {}

const IconEdit = forwardRef<SVGSVGElement, IconEdit>(
  ({ mode = 'default', width, height, ...props }, ref) => {
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
          d="M11.05 3.50002L4.20829 10.7417C3.94996 11.0167 3.69996 11.5584 3.64996 11.9334L3.34162 14.6334C3.23329 15.6084 3.93329 16.275 4.89996 16.1084L7.58329 15.65C7.95829 15.5834 8.48329 15.3084 8.74162 15.025L15.5833 7.78335C16.7666 6.53335 17.3 5.10835 15.4583 3.36668C13.625 1.64168 12.2333 2.25002 11.05 3.50002Z"
          stroke="white"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(IconVariant({ strokeMode: mode }))}
        />
        <path
          d="M9.90833 4.7085C10.2667 7.0085 12.1333 8.76683 14.45 9.00016"
          stroke="white"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(IconVariant({ strokeMode: mode }))}
        />
        <path
          d="M2.5 18.8335H17.5"
          stroke="white"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(IconVariant({ strokeMode: mode }))}
        />
      </svg>
    );
  },
);

export default IconEdit;
