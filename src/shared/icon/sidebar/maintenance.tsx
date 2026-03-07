import { cn } from '@/core/utils/class.utils';
import { IconProps } from '@/shared/icon/types';
import { IconVariant } from '@/shared/icon/variants';
import { forwardRef } from 'react';

interface IconMaintenance extends IconProps {}

const IconMaintenance = forwardRef<SVGSVGElement, IconMaintenance>(
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
          d="M14.1737 13.2133L10.6675 9.70703"
          className={cn(IconVariant({ strokeMode: mode }))}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.6676 9.70787L8.16009 12.2154C7.60759 12.7679 6.70801 12.7679 6.15551 12.2154L3.15217 9.21203C2.59967 8.65953 2.59967 7.75995 3.15217 7.20745L8.16009 2.19953C8.71259 1.64703 9.61217 1.64703 10.1647 2.19953L13.168 5.20288C13.7205 5.75538 13.7205 6.65495 13.168 7.20745L10.6676 9.70787Z"
          className={cn(IconVariant({ strokeMode: mode }))}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.4165 14.9766H5.6665"
          className={cn(IconVariant({ strokeMode: mode }))}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.64648 5.71094L9.65441 10.7188"
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

export default IconMaintenance;
