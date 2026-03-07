import { cn } from '@/core/utils/class.utils';
import { forwardRef } from 'react';
import { TypographyProps } from './types';

const Heading2 = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <h2
        className={cn(
          'font-semibold font-Inter text-[14px] md:text-[15px] lg:text-[16px] xl:text-[17px] 2xl:text-[19px] leading-snug',
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </h2>
    );
  },
);

Heading2.displayName = 'Heading2';
export default Heading2;
