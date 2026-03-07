import useColor from '@/core/hooks/use-color';
import { cn } from '@/core/utils/class.utils';
import { forwardRef } from 'react';
import { TableRowProps } from '../utils/models';

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(({ className, ...props }, ref) => {
  const { colorList } = useColor();

  return (
    <tr
      ref={ref}
      style={{
        borderBottomWidth: 1,
        borderBottomColor: colorList.border,
      }}
      className={cn(
        'group transition-colors last:!border-b-0',
        className,
      )}
      {...props}
    />
  );
});
TableRow.displayName = 'TableRow';

export default TableRow;
