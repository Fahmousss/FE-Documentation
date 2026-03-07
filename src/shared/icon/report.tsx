import { cn } from '@/core/utils/class.utils';
import { IconProps } from '@/shared/icon/types';
import { IconVariant } from '@/shared/icon/variants';
import { forwardRef } from 'react';

interface IconReport extends IconProps {}

const IconReport = forwardRef<SVGSVGElement, IconReport>(
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
          d="M16.5 8.25V12.75C16.5 15.75 15.75 16.5 12.75 16.5H5.25C2.25 16.5 1.5 15.75 1.5 12.75V5.25C1.5 2.25 2.25 1.5 5.25 1.5H6.375C7.5 1.5 7.7475 1.83 8.175 2.4L9.3 3.9C9.585 4.275 9.75 4.5 10.5 4.5H12.75C15.75 4.5 16.5 5.25 16.5 8.25Z"
          stroke="#4C4E67"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          className={cn(IconVariant({ strokeMode: mode }))}
        />
        <path
          d="M6 1.5H12.75C14.25 1.5 15 2.25 15 3.75V4.785"
          stroke="#4C4E67"
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

export default IconReport;
