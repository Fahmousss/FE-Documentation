import { cn } from '@/core/utils/class.utils';
import { IconProps } from '@/shared/icon/types';
import { IconVariant } from '@/shared/icon/variants';
import { forwardRef } from 'react';

interface IconDashboard extends IconProps {}

const IconDashboard = forwardRef<SVGSVGElement, IconDashboard>(
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
          d="M16.5 8.77656V3.67656C16.5 2.55156 16.02 2.10156 14.8275 2.10156H11.7975C10.605 2.10156 10.125 2.55156 10.125 3.67656V8.77656C10.125 9.90156 10.605 10.3516 11.7975 10.3516H14.8275C16.02 10.3516 16.5 9.90156 16.5 8.77656Z"
          className={cn(IconVariant({ strokeMode: mode }))}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.5 15.5266V14.1766C16.5 13.0516 16.02 12.6016 14.8275 12.6016H11.7975C10.605 12.6016 10.125 13.0516 10.125 14.1766V15.5266C10.125 16.6516 10.605 17.1016 11.7975 17.1016H14.8275C16.02 17.1016 16.5 16.6516 16.5 15.5266Z"
          className={cn(IconVariant({ strokeMode: mode }))}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.875 10.4266V15.5266C7.875 16.6516 7.395 17.1016 6.2025 17.1016H3.1725C1.98 17.1016 1.5 16.6516 1.5 15.5266V10.4266C1.5 9.30156 1.98 8.85156 3.1725 8.85156H6.2025C7.395 8.85156 7.875 9.30156 7.875 10.4266Z"
          className={cn(IconVariant({ strokeMode: mode }))}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.875 3.67656V5.02656C7.875 6.15156 7.395 6.60156 6.2025 6.60156H3.1725C1.98 6.60156 1.5 6.15156 1.5 5.02656V3.67656C1.5 2.55156 1.98 2.10156 3.1725 2.10156H6.2025C7.395 2.10156 7.875 2.55156 7.875 3.67656Z"
          className={cn(IconVariant({ strokeMode: mode }))}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
);

export default IconDashboard;
