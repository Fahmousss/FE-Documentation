import { cn } from '@/core/utils/class.utils';
import { IconProps } from '@/shared/icon/types';
import { IconVariant } from '@/shared/icon/variants';
import { forwardRef } from 'react';

interface ArrowProps extends IconProps {
  bold?: boolean;
  hover?: boolean;
}

const Arrow = forwardRef<SVGSVGElement, ArrowProps>(
  ({ mode, hover, width, height, bold, className, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        {...props}
        width={width ?? 24}
        height={height ?? 24}
        viewBox={`0 0 20 20`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(className, 'group')}
      >
        <g id="vuesax/linear/arrow-up">
          <g id="arrow-up">
            <path
              id="Vector"
              d="M16.6 12.5417L11.1667 7.10833C10.525 6.46666 9.475 6.46666 8.83334 7.10833L3.4 12.5417"
              className={cn(
                IconVariant({ strokeMode: mode }),
                hover && 'group-hover:stroke-green-500',
              )}
              strokeWidth={bold ? '2.5' : '1.5'}
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </svg>
    );
  },
);

export default Arrow;
