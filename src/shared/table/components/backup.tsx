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
    const hasData = Array.isArray(data) && data.length > 0;

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
            className={cn(
              'w-full h-fit overflow-auto max-h-[100%] border border-neutral-600 rounded',
              height,
            )}
          >
            <table
              ref={ref}
              className={cn('w-full caption-bottom text-sm table-auto border-collapse', className)}
              {...props}
            >
              <Table.Body>
                {isLoading ? (
                  <Table.Loader rows={loaderRows} columns={loaderColumns} />
                ) : hasData ? (
                  children
                ) : (
                  <Table.Blank />
                )}
              </Table.Body>
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
