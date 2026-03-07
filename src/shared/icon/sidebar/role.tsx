import { cn } from '@/core/utils/class.utils';
import { IconProps } from '@/shared/icon/types';
import { IconVariant } from '@/shared/icon/variants';
import { forwardRef } from 'react';

interface IconRole extends IconProps {}

const IconRole = forwardRef<SVGSVGElement, IconRole>(({ mode, width, height, ...props }, ref) => {
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
        d="M4.95833 9.19922C2.125 9.19922 2.125 10.4671 2.125 12.0326V12.7409C2.125 14.6959 2.125 16.2826 5.66667 16.2826H11.3333C14.1667 16.2826 14.875 14.6959 14.875 12.7409V12.0326C14.875 10.4671 14.875 9.19922 12.0417 9.19922C11.3333 9.19922 11.135 9.34797 10.7667 9.62422L10.0442 10.3892C9.20833 11.2817 7.79167 11.2817 6.94875 10.3892L6.23333 9.62422C5.865 9.34797 5.66667 9.19922 4.95833 9.19922Z"
        className={cn(IconVariant({ strokeMode: mode }))}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.4582 9.20052V4.95052C13.4582 3.3851 13.4582 2.11719 10.6248 2.11719H6.37484C3.5415 2.11719 3.5415 3.3851 3.5415 4.95052V9.20052"
        className={cn(IconVariant({ strokeMode: mode }))}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.47314 7.23828H9.83189"
        className={cn(IconVariant({ strokeMode: mode }))}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.88477 5.11328H10.4264"
        className={cn(IconVariant({ strokeMode: mode }))}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export default IconRole;
