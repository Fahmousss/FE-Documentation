import { cn } from '@/core/utils/class.utils';
import { forwardRef } from 'react';
import { TableFooterProps } from '../utils/models';

const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)}
      {...props}
    />
  ),
);
TableFooter.displayName = 'TableFooter';

export default TableFooter;
