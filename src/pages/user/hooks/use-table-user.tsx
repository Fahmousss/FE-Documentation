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
import { dataSourceUser } from '../utils/constant';
import { IUser } from '../utils/model';

const columnHelper = createColumnHelper<IUser>();

export default function useTableUser({
  dataSource,
  editHandler,
  deleteHandler,
}: useTableParams<IUser[]>) {
  const data = useMemo(() => {
    return dataSource ?? dataSourceUser;
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
        id: 'username',
        header: ({ column }) => (
          <SortingHeader
            label="Username"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          />
        ),
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.nrp, {
        id: 'nrp',
        header: ({ column }) => (
          <SortingHeader
            label="NRP"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          />
        ),
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.role_name, {
        id: 'role',
        header: ({ column }) => (
          <SortingHeader
            label="Role"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          />
        ),
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.created_at, {
        id: 'created_at',
        header: () => 'Datetime',
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
  }, []);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel<IUser[]>(),
    getSortedRowModel: getSortedRowModel<IUser[]>(),
  });

  const isTableData = useMemo(() => {
    return table.getRowModel().rows.length > 0;
  }, [dataSource]);

  return { table, isTableData };
}
