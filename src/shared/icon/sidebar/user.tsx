import { cn } from '@/core/utils/class.utils';
import { IconProps } from '@/shared/icon/types';
import { IconVariant } from '@/shared/icon/variants';
import { forwardRef } from 'react';

interface IconUser extends IconProps {}

const IconUser = forwardRef<SVGSVGElement, IconUser>(({ mode, width, height, ...props }, ref) => {
  return (
    <svg
      ref={ref}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? 24}
      height={height ?? 25}
      viewBox="0 0 24 25"
      fill="none"
    >
      <path
        d="M12.16 11.5848C12.06 11.5748 11.94 11.5748 11.83 11.5848C9.45 11.5048 7.56 9.55484 7.56 7.15484C7.56 4.70484 9.54 2.71484 12 2.71484C14.45 2.71484 16.44 4.70484 16.44 7.15484C16.43 9.55484 14.54 11.5048 12.16 11.5848Z"
        className={cn(IconVariant({ strokeMode: mode }))}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.16 15.2748C4.74 16.8948 4.74 19.5348 7.16 21.1448C9.91 22.9848 14.42 22.9848 17.17 21.1448C19.59 19.5248 19.59 16.8848 17.17 15.2748C14.43 13.4448 9.92 13.4448 7.16 15.2748Z"
        className={cn(IconVariant({ strokeMode: mode }))}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export default IconUser;
