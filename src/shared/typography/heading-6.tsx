import { cn } from '@/core/utils/class.utils';
import { forwardRef } from 'react';
import { TypographyProps } from './types';

const Heading6 = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <h6
      className={cn(
        'font-medium font-Inter text-[10px] md:text-[11px] lg:text-[12px] xl:text-[13px] 2xl:text-[15px] leading-normal',
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </h6>
    );
  },
);

Heading6.displayName = 'Heading6';
export default Heading6;





