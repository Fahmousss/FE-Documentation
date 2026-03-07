import { cn } from '@/core/utils/class.utils';
import { IconProps } from '@/shared/icon/types';
import { IconVariant } from '@/shared/icon/variants';
import { forwardRef } from 'react';

interface IconMasterData extends IconProps {}

const IconMasterData = forwardRef<SVGSVGElement, IconMasterData>(
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
          d="M12.0415 9.79115V11.9161C12.0415 14.7495 10.9082 15.8828 8.07484 15.8828H5.38317C2.54984 15.8828 1.4165 14.7495 1.4165 11.9161V9.22448C1.4165 6.39115 2.54984 5.25781 5.38317 5.25781H7.50817"
          className={cn(IconVariant({ strokeMode: mode }))}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.0416 9.79115H9.77497C8.07497 9.79115 7.5083 9.22448 7.5083 7.52448V5.25781L12.0416 9.79115Z"
          className={cn(IconVariant({ strokeMode: mode }))}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.2168 1.71875H11.0501"
          className={cn(IconVariant({ strokeMode: mode }))}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.9585 3.84375C4.9585 2.66792 5.90766 1.71875 7.0835 1.71875H8.93933"
          className={cn(IconVariant({ strokeMode: mode }))}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.5832 5.96875V10.3533C15.5832 11.4512 14.6907 12.3438 13.5928 12.3438"
          className={cn(IconVariant({ strokeMode: mode }))}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.5835 5.96875H13.4585C11.8647 5.96875 11.3335 5.4375 11.3335 3.84375V1.71875L15.5835 5.96875Z"
          className={cn(IconVariant({ strokeMode: mode }))}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
);

export default IconMasterData;
