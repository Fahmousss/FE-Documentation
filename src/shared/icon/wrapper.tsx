import { forwardRef } from 'react';
import { IconWrapperProps } from './types';

const IconWrapper = forwardRef<SVGSVGElement, IconWrapperProps>(
  ({ children, width, height, viewBox, xmlns, fill, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        {...props}
        xmlns={xmlns ?? 'http://www.w3.org/2000/svg'}
        width={width ?? 24}
        height={height ?? 24}
        viewBox={viewBox ?? '0 0 24 24'}
        fill={fill ?? 'none'}
      >
        {children}
      </svg>
    );
  },
);

export default IconWrapper;
