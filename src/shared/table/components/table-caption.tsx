import { cn } from '@/core/utils/class.utils';
import { forwardRef } from 'react';
import { TableCaptionProps } from '../utils/models';

const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn('mt-4 text-sm text-muted-foreground', className)} {...props} />
  ),
);
TableCaption.displayName = 'TableCaption';

export default TableCaption;
