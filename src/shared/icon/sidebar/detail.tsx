import { cn } from '@/core/utils/class.utils';
import { IconProps } from '@/shared/icon/types';
import { IconVariant } from '@/shared/icon/variants';
import { forwardRef } from 'react';

interface IconDetail extends IconProps {}

const IconDetail = forwardRef<SVGSVGElement, IconDetail>(
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
          d="M13.4585 5.76953C14.6321 5.76953 15.5835 4.81814 15.5835 3.64453C15.5835 2.47093 14.6321 1.51953 13.4585 1.51953C12.2849 1.51953 11.3335 2.47093 11.3335 3.64453C11.3335 4.81814 12.2849 5.76953 13.4585 5.76953Z"
          className={cn(IconVariant({ strokeMode: mode }))}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.9585 9.30859H8.50016"
          className={cn(IconVariant({ strokeMode: mode }))}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.9585 12.1445H11.3335"
          className={cn(IconVariant({ strokeMode: mode }))}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.9165 1.51953H6.37484C2.83317 1.51953 1.4165 2.9362 1.4165 6.47786V10.7279C1.4165 14.2695 2.83317 15.6862 6.37484 15.6862H10.6248C14.1665 15.6862 15.5832 14.2695 15.5832 10.7279V7.1862"
          className={cn(IconVariant({ strokeMode: mode }))}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
);

export default IconDetail;
