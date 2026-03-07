import { cn } from '@/core/utils/class.utils';
import { forwardRef } from 'react';
import { IconProps } from './types';
import { IconVariant } from './variants';

interface IconTrash extends IconProps {}

const IconTrash = forwardRef<SVGSVGElement, IconTrash>(({ mode, width, height, ...props }, ref) => {
  return (
    <svg
      ref={ref}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? 20}
      height={height ?? 20}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(IconVariant({ strokeMode: mode }))}
      />
      <path
        d="M7.08337 4.14163L7.26671 3.04996C7.40004 2.25829 7.50004 1.66663 8.90837 1.66663H11.0917C12.5 1.66663 12.6084 2.29163 12.7334 3.05829L12.9167 4.14163"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(IconVariant({ strokeMode: mode }))}
      />
      <path
        d="M15.7083 7.6167L15.1666 16.0084C15.075 17.3167 15 18.3334 12.675 18.3334H7.32496C4.99996 18.3334 4.92496 17.3167 4.83329 16.0084L4.29163 7.6167"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(IconVariant({ strokeMode: mode }))}
      />
      <path
        d="M8.60828 13.75H11.3833"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(IconVariant({ strokeMode: mode }))}
      />
      <path
        d="M7.91663 10.4166H12.0833"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(IconVariant({ strokeMode: mode }))}
      />
    </svg>
  );
});

export default IconTrash;
