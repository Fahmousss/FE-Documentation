import { cn } from '@/core/utils/class.utils';
import { forwardRef } from 'react';
import { TypographyProps } from './types';

const Display2 = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn(
          'font-bold font-Inter text-[18px] md:text-[19px] lg:text-[20px] xl:text-[22px] 2xl:text-[24px] leading-tight',
          className,
        )}
        {...props}
      >
        {children}
      </h2>
    );
  },
);

Display2.displayName = 'Display2';
export default Display2;
