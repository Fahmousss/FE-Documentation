import { cn } from '@/core/utils/class.utils';
import { IconProps } from '@/shared/icon/types';
import { IconVariant } from '@/shared/icon/variants';
import { forwardRef } from 'react';

interface IconDelete extends IconProps {}

const IconDelete = forwardRef<SVGSVGElement, IconDelete>(
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
          d="M17.5 5.48356C14.725 5.20856 11.9333 5.06689 9.15 5.06689C7.5 5.06689 5.85 5.15023 4.2 5.31689L2.5 5.48356"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(IconVariant({ strokeMode: mode }))}
        />
        <path
          d="M7.08337 4.6415L7.26671 3.54984C7.40004 2.75817 7.50004 2.1665 8.90837 2.1665H11.0917C12.5 2.1665 12.6084 2.7915 12.7334 3.55817L12.9167 4.6415"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(IconVariant({ strokeMode: mode }))}
        />
        <path
          d="M15.7083 8.1167L15.1666 16.5084C15.075 17.8167 15 18.8334 12.675 18.8334H7.32496C4.99996 18.8334 4.92496 17.8167 4.83329 16.5084L4.29163 8.1167"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(IconVariant({ strokeMode: mode }))}
        />
        <path
          d="M8.60828 14.25H11.3833"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(IconVariant({ strokeMode: mode }))}
        />
        <path
          d="M7.91663 10.9165H12.0833"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(IconVariant({ strokeMode: mode }))}
        />
      </svg>
    );
  },
);

export default IconDelete;
