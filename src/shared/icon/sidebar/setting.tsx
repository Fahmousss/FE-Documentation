import { cn } from '@/core/utils/class.utils';
import { IconProps } from '@/shared/icon/types';
import { IconVariant } from '@/shared/icon/variants';
import { forwardRef } from 'react';

interface IconSetting extends IconProps {}

const IconSetting = forwardRef<SVGSVGElement, IconSetting>(
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
          d="M8.5 10.8242C9.6736 10.8242 10.625 9.87282 10.625 8.69922C10.625 7.52561 9.6736 6.57422 8.5 6.57422C7.32639 6.57422 6.375 7.52561 6.375 8.69922C6.375 9.87282 7.32639 10.8242 8.5 10.8242Z"
          className={cn(IconVariant({ strokeMode: mode }))}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.4165 9.32094V8.07427C1.4165 7.33761 2.01859 6.72844 2.76234 6.72844C4.04442 6.72844 4.56859 5.82177 3.924 4.70969C3.55567 4.07219 3.77525 3.24344 4.41984 2.87511L5.64525 2.17386C6.20484 1.84094 6.92734 2.03927 7.26025 2.59886L7.33817 2.73344C7.97567 3.84552 9.024 3.84552 9.66859 2.73344L9.7465 2.59886C10.0794 2.03927 10.8019 1.84094 11.3615 2.17386L12.5869 2.87511C13.2315 3.24344 13.4511 4.07219 13.0828 4.70969C12.4382 5.82177 12.9623 6.72844 14.2444 6.72844C14.9811 6.72844 15.5903 7.33052 15.5903 8.07427V9.32094C15.5903 10.0576 14.9882 10.6668 14.2444 10.6668C12.9623 10.6668 12.4382 11.5734 13.0828 12.6855C13.4511 13.3301 13.2315 14.1518 12.5869 14.5201L11.3615 15.2214C10.8019 15.5543 10.0794 15.3559 9.7465 14.7964L9.66859 14.6618C9.03109 13.5497 7.98275 13.5497 7.33817 14.6618L7.26025 14.7964C6.92734 15.3559 6.20484 15.5543 5.64525 15.2214L4.41984 14.5201C3.77525 14.1518 3.55567 13.323 3.924 12.6855C4.56859 11.5734 4.04442 10.6668 2.76234 10.6668C2.01859 10.6668 1.4165 10.0576 1.4165 9.32094Z"
          className={cn(IconVariant({ strokeMode: mode }))}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
);

export default IconSetting;
