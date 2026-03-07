import useColor from '@/core/hooks/use-color';
import { Pagination as IPagination } from '@/core/models/http.types';
import { cn } from '@/core/utils/class.utils';
import { forwardRef } from 'react';
import { Table } from '..';
import { TableContext } from '../hooks/table-context';
import { TableProps } from '../utils/models';

const TableRoot = forwardRef<HTMLTableElement, TableProps>(
  (
    {
      pagination,
      setPageSize,
      setPageNumber,
      height,
      isTableData,
      className,
      isLoading = false,
      loaderRows = 5,
      loaderColumns = 7,
      selectedRow,
      children,
      data,
      ...props
    },
    ref,
  ) => {
    const { colorList } = useColor();

    return (
      <TableContext.Provider
        value={{
          pagination: pagination ?? ({} as IPagination),
          setPageNumber,
          setPageSize,
          selectedRow,
        }}
      >
        <div className="h-full flex flex-col overflow-hidden">
          <div
            style={{
              borderWidth: 1,
              borderColor: colorList.border,
            }}
            className={cn(
              'w-full overflow-auto max-h-[100%] rounded-lg',
              height,
            )}
          >
            <table
              ref={ref}
              className={cn(
                'w-full caption-bottom text-[13px] table-auto border-collapse',
                className,
              )}
              {...props}
            >
              {isLoading ? (
                <Table.Loader rows={loaderRows} columns={loaderColumns} />
              ) : isTableData ? (
                children
              ) : (
                <Table.Blank />
              )}
            </table>
          </div>
          {pagination ? <Table.Pagination /> : null}
        </div>
      </TableContext.Provider>
    );
  },
);

TableRoot.displayName = 'Table';

export default TableRoot;
