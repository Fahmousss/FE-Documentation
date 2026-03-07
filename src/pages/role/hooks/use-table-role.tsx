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
import { dataSourceRole } from '../utils/constant';
import { IRole } from '../utils/model';

const columnHelper = createColumnHelper<IRole>();

export default function useTableRole({
  dataSource,
  editHandler,
  deleteHandler,
}: useTableParams<IRole[]>) {
  const data = useMemo(() => {
    return dataSource ?? dataSourceRole;
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
      columnHelper.accessor((row) => row.permissions, {
        id: 'menu',
        header: ({ column }) => (
          <SortingHeader
            label="Menu"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          />
        ),
        cell: (info) => {
          const menus = info.getValue();
          return menus?.map((menu, index) => (
            <div className="flex items-center gap-1" key={`menu-${index}`}>
              <div className="size-1 rounded-full bg-primary" />
              <p className="font-Inter font-normal text-md text-primary">{menu.page}</p>
            </div>
          ));
        },
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.permissions, {
        id: 'permission',
        header: ({ column }) => (
          <SortingHeader
            label="Permissions"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          />
        ),
        cell: (info) => {
          const menus = info.getValue();
          return menus?.map((menu, index) => (
            <div className="flex items-center gap-1" key={`menu-${index}`}>
              <div className="size-1 rounded-full bg-primary" />
              <p className="font-Inter font-normal text-md text-primary">
                {menu.permission.map((perm, index) => {
                  if (index === menu.permission.length - 1) return perm;
                  return `${perm}, `;
                })}
              </p>
            </div>
          ));
        },
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
    getCoreRowModel: getCoreRowModel<IRole[]>(),
    getSortedRowModel: getSortedRowModel<IRole[]>(),
  });

  const isTableData = useMemo(() => {
    return table.getRowModel().rows.length > 0;
  }, [dataSource]);

  return { table, isTableData };
}
