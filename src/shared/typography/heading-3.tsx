import { cn } from '@/core/utils/class.utils';
import { forwardRef } from 'react';
import { TypographyProps } from './types';

const Heading3 = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <h3
      className={cn(
        'font-medium font-Inter text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px] leading-snug',
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </h3>
    );
  },
);

Heading3.displayName = 'Heading3';
export default Heading3;


