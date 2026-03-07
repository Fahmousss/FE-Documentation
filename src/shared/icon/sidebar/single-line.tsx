import { cn } from '@/core/utils/class.utils';
import { IconProps } from '@/shared/icon/types';
import { IconVariant } from '@/shared/icon/variants';
import { forwardRef } from 'react';

interface IconSingleLine extends IconProps {}

const IconSingleLine = forwardRef<SVGSVGElement, IconSingleLine>(
  ({ mode, width, height, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? 19}
        height={height ?? 18}
        viewBox="0 0 19 18"
        fill="none"
      >
        <path
          d="M3.12516 6.47396C3.90757 6.47396 4.54183 5.83969 4.54183 5.05729C4.54183 4.27489 3.90757 3.64062 3.12516 3.64062C2.34276 3.64062 1.7085 4.27489 1.7085 5.05729C1.7085 5.83969 2.34276 6.47396 3.12516 6.47396Z"
          className={cn(IconVariant({ strokeMode: mode }))}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.8752 6.47396C16.6576 6.47396 17.2918 5.83969 17.2918 5.05729C17.2918 4.27489 16.6576 3.64062 15.8752 3.64062C15.0928 3.64062 14.4585 4.27489 14.4585 5.05729C14.4585 5.83969 15.0928 6.47396 15.8752 6.47396Z"
          className={cn(IconVariant({ strokeMode: mode }))}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.4583 5.05859H11.625"
          className={cn(IconVariant({ strokeMode: mode }))}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.37533 5.05859H4.54199"
          className={cn(IconVariant({ strokeMode: mode }))}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.31266 11.7891V13.2057C6.31266 13.6378 6.05058 14.0132 5.68225 14.1691C5.54766 14.2328 5.406 14.2682 5.25016 14.2682H3.8335C3.24558 14.2682 2.771 13.7936 2.771 13.2057V11.7891C2.771 11.2011 3.24558 10.7266 3.8335 10.7266H5.25016C5.83808 10.7266 6.31266 11.2011 6.31266 11.7891Z"
          className={cn(IconVariant({ strokeMode: mode }))}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.2292 11.7891V13.2057C16.2292 13.7936 15.7546 14.2682 15.1667 14.2682H13.75C13.5942 14.2682 13.4525 14.2328 13.3179 14.1691C12.9496 14.0132 12.6875 13.6378 12.6875 13.2057V11.7891C12.6875 11.2011 13.1621 10.7266 13.75 10.7266H15.1667C15.7546 10.7266 16.2292 11.2011 16.2292 11.7891Z"
          className={cn(IconVariant({ strokeMode: mode }))}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.625 3.99609V6.12109C11.625 6.70193 11.1433 7.18359 10.5625 7.18359H8.4375C7.85667 7.18359 7.375 6.70193 7.375 6.12109V3.99609C7.375 3.41526 7.85667 2.93359 8.4375 2.93359H10.5625C11.1433 2.93359 11.625 3.41526 11.625 3.99609Z"
          className={cn(IconVariant({ strokeMode: mode }))}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.625 5.57422C13.3037 6.42422 14.4583 8.25173 14.4583 10.3696C14.4583 10.4901 14.4512 10.6034 14.4371 10.7238"
          className={cn(IconVariant({ strokeMode: mode }))}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.56324 10.7238C4.54908 10.6034 4.54199 10.4901 4.54199 10.3696C4.54199 8.25173 5.69658 6.42422 7.37533 5.57422"
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

export default IconSingleLine;
