import { cn } from '@/core/utils/class.utils';
import { forwardRef } from 'react';
import { IconVariant } from './variants';
import { IconProps } from './types';

interface IconEyeHide extends IconProps {}

const IconEyeHide = forwardRef<SVGSVGElement, IconEyeHide>(
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
          d="M10.8974 8.01602L7.10244 11.811C6.61494 11.3235 6.31494 10.656 6.31494 9.91352C6.31494 8.42852 7.51494 7.22852 8.99994 7.22852C9.74244 7.22852 10.4099 7.52852 10.8974 8.01602Z"
          className={cn(IconVariant({ strokeMode: mode }))}
        />
        <path
          d="M13.3649 5.24094C12.0524 4.25094 10.5524 3.71094 8.99988 3.71094C6.35238 3.71094 3.88488 5.27094 2.16738 7.97094C1.49238 9.02844 1.49238 10.8059 2.16738 11.8634C2.75988 12.7934 3.44988 13.5959 4.19988 14.2409"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(IconVariant({ strokeMode: mode }))}
        />
        <path
          d="M6.31494 15.5604C7.16994 15.9204 8.07744 16.1154 8.99994 16.1154C11.6474 16.1154 14.1149 14.5554 15.8324 11.8554C16.5074 10.7979 16.5074 9.02035 15.8324 7.96285C15.5849 7.57285 15.3149 7.20535 15.0374 6.86035"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(IconVariant({ strokeMode: mode }))}
        />
        <path
          d="M11.6326 10.4385C11.4376 11.496 10.5751 12.3585 9.51758 12.5535"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(IconVariant({ strokeMode: mode }))}
        />
        <path
          d="M7.1025 11.8105L1.5 17.413"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(IconVariant({ strokeMode: mode }))}
        />
        <path
          d="M16.5 2.41309L10.8975 8.01559"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(IconVariant({ strokeMode: mode }))}
        />
      </svg>
    );
  },
);

export default IconEyeHide;
