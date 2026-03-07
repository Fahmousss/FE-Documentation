import { cn } from '@/core/utils/class.utils';
import { forwardRef } from 'react';
import { TypographyProps } from './types';

const Heading1 = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <h1
        ref={ref}
        className={cn(
          'font-semibold font-Inter text-[15px] md:text-[16px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px] leading-snug',
          className,
        )}
        {...props}
      >
        {children}
      </h1>
    );
  },
);

Heading1.displayName = 'Heading1';
export default Heading1;
