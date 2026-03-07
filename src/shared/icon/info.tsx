import { cn } from '@/core/utils/class.utils';
import { IconProps } from '@/shared/icon/types';
import { IconVariant } from '@/shared/icon/variants';
import { forwardRef } from 'react';

interface IconInfoProps extends IconProps {}

const IconInfo = forwardRef<SVGSVGElement, IconInfoProps>(({ mode, ...props }, ref) => {
  return (
    <svg
      ref={ref}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
    >
      <path
        d="M12 22.1875C17.5228 22.1875 22 17.7103 22 12.1875C22 6.66465 17.5228 2.1875 12 2.1875C6.47715 2.1875 2 6.66465 2 12.1875C2 17.7103 6.47715 22.1875 12 22.1875Z"
        className={cn(IconVariant({ strokeMode: mode }))}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 16.1875V12.1875M12 8.1875H12.01"
        className={cn(IconVariant({ strokeMode: mode }))}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export default IconInfo;
