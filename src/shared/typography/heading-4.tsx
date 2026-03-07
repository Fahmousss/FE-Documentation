import { cn } from '@/core/utils/class.utils';
import { forwardRef } from 'react';
import { TypographyProps } from './types';

const Heading4 = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <h4
        className={cn(
          'font-medium font-Inter text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[17px] leading-normal',
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </h4>
    );
  },
);

Heading4.displayName = 'Heading4';
export default Heading4;
