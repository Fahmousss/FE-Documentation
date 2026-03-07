import { cn } from '@/core/utils/class.utils';
import { IconProps } from '@/shared/icon/types';
import { IconVariant } from '@/shared/icon/variants';
import { forwardRef } from 'react';

interface ClockIcon extends IconProps {}

const Clock = forwardRef<SVGSVGElement, ClockIcon>(({ mode, width, height, ...props }, ref) => {
  return (
    <svg
      ref={ref}
      {...props}
      width={width ?? 16}
      height={height ?? 16}
      viewBox={`0 0 16 16`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="vuesax/bold/clock">
        <g id="clock">
          <path
            className={cn(IconVariant({ mode, strokeMode: mode }))}
            id="Vector"
            d="M7.89022 9.74928L7.89042 9.7494L9.94834 10.9775C10.1213 11.089 10.3041 11.1267 10.4666 11.1267C10.8052 11.1267 11.1404 10.9565 11.3293 10.6364C11.6192 10.1567 11.4575 9.54264 10.981 9.26292L8.91621 8.03068L8.91623 8.03065L8.91297 8.02877C8.91298 8.02877 8.91297 8.02877 8.91297 8.02876C8.91279 8.0285 8.90177 8.02068 8.88283 7.99939C8.86073 7.97454 8.83629 7.94078 8.81377 7.90118C8.79127 7.86162 8.77447 7.82288 8.76405 7.79028C8.75448 7.76036 8.75343 7.74555 8.75332 7.74556C8.75332 7.74556 8.75331 7.7456 8.75331 7.74567V5.01337C8.75331 4.4639 8.30279 4.01337 7.75331 4.01337C7.20384 4.01337 6.75331 4.4639 6.75331 5.01337V7.74671C6.75331 8.51561 7.22548 9.35216 7.89022 9.74928ZM1.83331 8.00004C1.83331 4.60285 4.60279 1.83337 7.99998 1.83337C11.3972 1.83337 14.1666 4.60285 14.1666 8.00004C14.1666 11.3972 11.3972 14.1667 7.99998 14.1667C4.60279 14.1667 1.83331 11.3972 1.83331 8.00004Z"
          />
        </g>
      </g>
    </svg>
  );
});

export default Clock;
