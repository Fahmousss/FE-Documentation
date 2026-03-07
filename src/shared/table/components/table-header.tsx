import { cn } from '@/core/utils/class.utils';
import { forwardRef } from 'react';
import { TableHeaderProps } from '../utils/models';

const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <thead
        ref={ref}
        className={cn(
          '',
          className,
        )}
        {...props}
      />
    );
  },
);
TableHeader.displayName = 'TableHeader';

export default TableHeader;
