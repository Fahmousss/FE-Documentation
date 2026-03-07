import { cn } from '@/core/utils/class.utils';
import { forwardRef } from 'react';
import { IconVariant } from './variants';
import { IconProps } from './types';

interface IconEyeShow extends IconProps {}

const IconEyeShow = forwardRef<SVGSVGElement, IconEyeShow>(
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
          d="M11.6849 9.00043C11.6849 10.4854 10.4849 11.6854 8.99994 11.6854C7.51494 11.6854 6.31494 10.4854 6.31494 9.00043C6.31494 7.51543 7.51494 6.31543 8.99994 6.31543C10.4849 6.31543 11.6849 7.51543 11.6849 9.00043Z"
          className={cn(IconVariant({ strokeMode: mode }))}
        />
        <path
          d="M9 15.2025C11.6475 15.2025 14.115 13.6425 15.8325 10.9425C16.5075 9.88504 16.5075 8.10754 15.8325 7.05004C14.115 4.35004 11.6475 2.79004 9 2.79004C6.3525 2.79004 3.885 4.35004 2.1675 7.05004C1.4925 8.10754 1.4925 9.88504 2.1675 10.9425C3.885 13.6425 6.3525 15.2025 9 15.2025Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(IconVariant({ strokeMode: mode }))}
        />
      </svg>
    );
  },
);

export default IconEyeShow;
