import { cn } from '@/core/utils/class.utils';
import { forwardRef } from 'react';
import { TypographyProps } from './types';

const Paragraph = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <p
        className={cn(
          'font-normal font-Inter text-[10px] md:text-[11px] lg:text-[11.5px] xl:text-[12px] 2xl:text-[14px] leading-relaxed',
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </p>
    );
  },
);

Paragraph.displayName = 'Paragraph';
export default Paragraph;
