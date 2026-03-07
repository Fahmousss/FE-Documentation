import { cn } from '@/core/utils/class.utils';
import { IconProps } from '@/shared/icon/types';
import { IconVariant } from '@/shared/icon/variants';
import { forwardRef } from 'react';

interface IconPermission extends IconProps {}

const IconPermission = forwardRef<SVGSVGElement, IconPermission>(
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
          d="M6.48831 8.4001C6.41748 8.39302 6.33248 8.39302 6.25456 8.4001C4.56873 8.34344 3.22998 6.96219 3.22998 5.26219C3.22998 3.52677 4.63248 2.11719 6.37498 2.11719C8.1104 2.11719 9.51998 3.52677 9.51998 5.26219C9.5129 6.96219 8.17415 8.34344 6.48831 8.4001Z"
          className={cn(IconVariant({ strokeMode: mode }))}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.6238 3.53125C12.998 3.53125 14.103 4.64333 14.103 6.01042C14.103 7.34917 13.0405 8.44 11.7159 8.48958C11.6592 8.4825 11.5955 8.4825 11.5317 8.48958"
          className={cn(IconVariant({ strokeMode: mode }))}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.94676 11.0113C1.23259 12.1588 1.23259 14.0288 2.94676 15.1692C4.89467 16.4725 8.08926 16.4725 10.0372 15.1692C11.7513 14.0217 11.7513 12.1517 10.0372 11.0113C8.09634 9.715 4.90176 9.715 2.94676 11.0113Z"
          className={cn(IconVariant({ strokeMode: mode }))}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.9907 14.8672C13.5007 14.7609 13.9824 14.5555 14.3791 14.2509C15.4841 13.4222 15.4841 12.0551 14.3791 11.2264C13.9895 10.9289 13.5149 10.7305 13.012 10.6172"
          className={cn(IconVariant({ strokeMode: mode }))}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
);

export default IconPermission;
