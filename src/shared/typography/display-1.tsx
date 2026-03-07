import { cn } from '@/core/utils/class.utils';
import { forwardRef } from 'react';
import { TypographyProps } from './types';

const Display1 = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <h1
        ref={ref}
        className={cn(
          'font-bold font-Inter text-[20px] md:text-[21px] lg:text-[22px] xl:text-[24px] 2xl:text-[26px] leading-tight',
          className,
        )}
        {...props}
      >
        {children}
      </h1>
    );
  },
);

Display1.displayName = 'Display1';
export default Display1;
