import { cn } from '@/core/utils/class.utils';
import { forwardRef } from 'react';
import { TypographyProps } from './types';

const Span = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <span
        className={cn(
          'font-medium whitespace-nowrap font-Inter text-[9px] md:text-[10px] lg:text-[10.5px] xl:text-[11px] 2xl:text-[13px] leading-normal',
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </span>
    );
  },
);

Span.displayName = 'Span';
export default Span;
