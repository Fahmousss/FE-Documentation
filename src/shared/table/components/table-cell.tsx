import { cn } from '@/core/utils/class.utils';
import { CommonTextColorVariants } from '@/core/variants/global.variant';
import { forwardRef } from 'react';
import { TableCellProps } from '../utils/models';

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, isSelect, children, isAction, actionClassName, isNumber, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        CommonTextColorVariants(),
        'group-hover:bg-neutral-100 text-left px-3 py-2 text-sm [&:has([role=checkbox])]:pr-0',
        isNumber ? 'w-8 min-w-8' : '',
        isAction ? 'text-center left-0 z-[999] w-52 min-w-52' : '',
        isAction && isSelect ? 'text-center left-14 z-[999]' : '',
        isSelect ? 'left-0 z-[999] w-8 min-w-8' : '',
        className,
      )}
      {...props}
    >
      {isAction ? (
        <div className={cn('w-full gap-1.5 flex justify-center', actionClassName)}>{children}</div>
      ) : (
        <div className="font-normal text-[13px]">{children}</div>
      )}
    </td>
  ),
);
TableCell.displayName = 'TableCell';

export default TableCell;
