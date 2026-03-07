import { cn } from '@/core/utils/class.utils';
import { forwardRef } from 'react';
import Clock from '../icon/clock';
import IconX from '../icon/x';
import { BadgeProps } from './types';
import { BadgeVariant } from './variants';

const BadgeEID = forwardRef<HTMLDivElement, BadgeProps>(
  ({ icon, label, theme, size, className, children, onXClick, ...props }, ref) => {
    return (
      <div ref={ref} {...props} className={cn(BadgeVariant({ theme, size, className }))}>
        {icon ? <Clock mode={theme} /> : null}
        {label ?? null}
        {children}
        {onXClick ? (
          <IconX className="hover:cursor-pointer" onClick={onXClick} mode={theme} />
        ) : null}
      </div>
    );
  },
);
export default BadgeEID;
