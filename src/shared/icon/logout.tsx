import { cn } from '@/core/utils/class.utils';
import { IconProps } from '@/shared/icon/types';
import { forwardRef } from 'react';
import { IconVariant } from './variants';

interface Logout extends IconProps {}

const IconLogout = forwardRef<SVGSVGElement, Logout>(({ mode, width, height, ...props }, ref) => {
  return (
    <svg
      ref={ref}
      {...props}
      width={width ?? 24}
      height={height ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="vuesax/linear/logout">
        <g id="logout">
          <path
            id="Vector"
            d="M8.90039 7.55999C9.21039 3.95999 11.0604 2.48999 15.1104 2.48999H15.2404C19.7104 2.48999 21.5004 4.27999 21.5004 8.74999V15.27C21.5004 19.74 19.7104 21.53 15.2404 21.53H15.1104C11.0904 21.53 9.24039 20.08 8.91039 16.54"
            stroke="#F92A58"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(IconVariant({ strokeMode: mode }))}
          />
          <path
            id="Vector_2"
            d="M14.9991 12H3.61914"
            stroke="#F92A58"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(IconVariant({ strokeMode: mode }))}
          />
          <path
            id="Vector_3"
            d="M5.85 8.6499L2.5 11.9999L5.85 15.3499"
            stroke="#F92A58"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(IconVariant({ strokeMode: mode }))}
          />
        </g>
      </g>
    </svg>
  );
});

export default IconLogout;
