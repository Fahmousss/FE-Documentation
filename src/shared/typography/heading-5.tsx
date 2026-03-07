import { cn } from '@/core/utils/class.utils';
import { forwardRef } from 'react';
import { TypographyProps } from './types';

const Heading5 = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <h5
      className={cn(
        'font-medium font-Inter text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[16px] leading-normal',
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </h5>
    );
  },
);

Heading5.displayName = 'Heading5';
export default Heading5;



