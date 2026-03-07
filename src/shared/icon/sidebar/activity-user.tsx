import { cn } from '@/core/utils/class.utils';
import { IconProps } from '@/shared/icon/types';
import { IconVariant } from '@/shared/icon/variants';
import { forwardRef } from 'react';

interface IconActivityUser extends IconProps {}

const IconActivityUser = forwardRef<SVGSVGElement, IconActivityUser>(
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
          d="M15.5832 9.20052C15.5832 13.1105 12.4098 16.2839 8.49984 16.2839C4.58984 16.2839 1.4165 13.1105 1.4165 9.20052C1.4165 5.29052 4.58984 2.11719 8.49984 2.11719C12.4098 2.11719 15.5832 5.29052 15.5832 9.20052Z"
          className={cn(IconVariant({ strokeMode: mode }))}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.1278 11.4524L8.93196 10.142C8.54946 9.91536 8.23779 9.36995 8.23779 8.9237V6.01953"
          className={cn(IconVariant({ strokeMode: mode }))}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
);

export default IconActivityUser;
