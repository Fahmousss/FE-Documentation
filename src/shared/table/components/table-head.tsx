import useColor from '@/core/hooks/use-color';
import { cn } from '@/core/utils/class.utils';
import { CommonTextColorVariants } from '@/core/variants/global.variant';
import { forwardRef } from 'react';
import { TableHeadProps } from '../utils/models';

const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, isNumber, isAction, isSelect, ...props }, ref) => {
    const { colorList } = useColor();
    return (
      <th
        ref={ref}
        style={{
          background: colorList.table,
          borderBottomWidth: 1,
          borderBottomColor: colorList.border
        }}
        className={cn(
          CommonTextColorVariants(),
          'sticky top-0 left-0 px-3 h-[46px] py-2.5 text-left align-middle font-bold [&:has([role=checkbox])]:pr-0',
          isNumber ? 'w-8 min-w-8' : '',
          isAction ? 'text-center left-0 z-[999] w-52 min-w-52' : '',
          isAction && isSelect ? 'text-center left-14 z-[999]' : '',
          isSelect ? 'left-0 z-[999] w-8 min-w-8' : '',
          className,
        )}
        {...props}
      >
        <div className="font-bold">{props.children}</div>
      </th>
    );
  },
);
TableHead.displayName = 'TableHead';

export default TableHead;
