import { forwardRef } from 'react';
import { Table } from '..';
export interface TableLoaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  columns?: number;
  rows?: number;
}

const TableLoader = forwardRef<HTMLTableSectionElement, TableLoaderProps>(
  ({ columns = 7, rows = 5 }) => {
    const dummyRows = Array.from({ length: rows });
    const dummyCols = Array.from({ length: columns });

    return (
      <>
        {dummyRows.map((_, rowIdx) => (
          <Table.Row key={rowIdx}>
            {dummyCols.map((_, colIdx) => (
              <Table.Cell key={colIdx}>
                <div className="relative h-4 bg-slate-200 rounded-md w-full overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                </div>
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </>
    );
  },
);

TableLoader.displayName = 'TableLoader';

export default TableLoader;
