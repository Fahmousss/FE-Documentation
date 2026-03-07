import { cn } from '@/core/utils/class.utils';
import { forwardRef } from 'react';
import { TableBodyProps } from '../utils/models';

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn('', className)} {...props} />
  ),
);
TableBody.displayName = 'TableBody';

export default TableBody;
