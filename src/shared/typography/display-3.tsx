import { cn } from '@/core/utils/class.utils';
import { forwardRef } from 'react';
import { TypographyProps } from './types';

const Display3 = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn(
          'font-semibold font-Inter text-[16px] md:text-[17px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] leading-tight',
          className,
        )}
        {...props}
      >
        {children}
      </h3>
    );
  },
);

Display3.displayName = 'Display2';
export default Display3;
