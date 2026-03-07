import { cn } from '@/core/utils/class.utils';
import { forwardRef } from 'react';
import { IconProps } from './types';
import { IconVariant } from './variants';

interface IconPencil extends IconProps {}

const IconPencil = forwardRef<SVGSVGElement, IconPencil>(({ mode, width, height, ...props }, ref) => {
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? 20}
      height={height ?? 20}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M11.05 3.00002L4.20829 10.2417C3.94996 10.5167 3.69996 11.0584 3.64996 11.4334L3.34162 14.1334C3.23329 15.1084 3.93329 15.775 4.89996 15.6084L7.58329 15.15C7.95829 15.0834 8.48329 14.8084 8.74162 14.525L15.5833 7.28335C16.7666 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2333 1.75002 11.05 3.00002Z"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(IconVariant({ strokeMode: mode }))}
      />
      <path
        d="M9.90833 4.20837C10.2667 6.50837 12.1333 8.26671 14.45 8.50004"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(IconVariant({ strokeMode: mode }))}
      />
      <path
        d="M2.5 18.3334H17.5"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(IconVariant({ strokeMode: mode }))}
      />
    </svg>
  );
});

export default IconPencil;
