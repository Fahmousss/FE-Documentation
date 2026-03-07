import { cn } from '@/core/utils/class.utils';
import { IconProps } from '@/shared/icon/types';
import { IconVariant } from '@/shared/icon/variants';
import { forwardRef } from 'react';

interface IconChart extends IconProps {}

const IconChart = forwardRef<SVGSVGElement, IconChart>(
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
          d="M1.41669 1.91699V13.9587C1.41669 15.1345 2.36585 16.0837 3.54169 16.0837H15.5834"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(IconVariant({ strokeMode: mode }))}
        />
        <path
          d="M3.54169 12.5413L6.79294 8.74469C7.33127 8.12135 8.28752 8.07884 8.86835 8.66676L9.54127 9.33968C10.1221 9.92052 11.0784 9.88509 11.6167 9.26175L14.875 5.45801"
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

export default IconChart;
