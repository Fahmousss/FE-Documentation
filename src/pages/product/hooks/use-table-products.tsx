import { useTableParams } from '@/core/models/use-table.Types';
import ButtonDelete from '@/shared/button/components/button-delete';
import ButtonEdit from '@/shared/button/components/button-edit';
import SortingHeader from '@/shared/table/components/sorting-header';
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';
import { IProducts } from '../utils/model';

// Hooks 

// utils
const columnHelper = createColumnHelper<IProducts>();

export default function useTableProducts({
  dataSource,
  editHandler,
  deleteHandler,
}: useTableParams<IProducts[]>) {
  const data = useMemo(() => {
    return dataSource ?? [];
  }, [dataSource]);

  const columns = useMemo(() => {
    return [
      columnHelper.display({
        id: 'no',
        header: ({ column }) => (
          <SortingHeader
            label="No"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          />
        ),
        cell: ({ row }) => row.index + 1,
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.name, {
        id: 'name',
        header: ({ column }) => (
          <SortingHeader
            label="Name"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          />
        ),
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.created_at, {
        id: 'created_at',
        header: ({ column }) => (
          <SortingHeader
            label="Datetime"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          />
        ),
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.display({
        id: 'action',
        header: () => 'Action',
        cell: ({ cell }) => (
          <>
            <ButtonEdit onClick={() => editHandler(cell.row.original)} />
            <ButtonDelete onClick={() => deleteHandler(cell.row.original)} />
          </>
        ),
        footer: (info) => info.column.id,
      }),
    ];
  }, [editHandler, deleteHandler]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel<IProducts[]>(),
    getSortedRowModel: getSortedRowModel<IProducts[]>(),
  });

  const isTableData = useMemo(() => {
    return table.getRowModel().rows.length > 0;
  }, [dataSource]);

  return { table, isTableData };
}
