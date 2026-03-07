import ButtonDelete from '@/shared/button/components/button-delete';
import ButtonEdit from '@/shared/button/components/button-edit';
import { ButtonResetPassword } from '@/shared/button/components/button-reset-password';
import SortingHeader from '@/shared/table/components/sorting-header';
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Checkbox } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { ITableUserManagement } from '../utils/model';

const columnHelper = createColumnHelper<ITableUserManagement>();

export default function useTableUserManagement({
  deleteHandler,
  editHandler,
  deleteHandlerAll,
  resetPasswordHandler,
  dataSource,
}) {
  const [trigger, setTrigger] = useState(0);
  const [isDelete, setIsDelete] = useState(false);
  const [dataId, setDataId] = useState<string[]>([]);

  const data = useMemo(() => {
    return dataSource ?? [];
  }, [dataSource]);

  useEffect(() => {
    setDataId(table?.getSelectedRowModel().flatRows.map((row) => row.original.id));
  }, [trigger]);

  useEffect(() => {
    if (isDelete && dataId.length > 0) {
      deleteHandlerAll?.(dataId);
      table.toggleAllPageRowsSelected(false);
    }
    setIsDelete(false);
  }, [isDelete]);

  const columns = useMemo(() => {
    return [
      columnHelper.display({
        id: 'select',
        header: ({ table }) => (
          <div className="w-0 flex items-center gap-3">
            <Checkbox
              checked={table.getIsAllPageRowsSelected()}
              onChange={(value) => {
                table.toggleAllPageRowsSelected(value.target.checked);
                setTrigger((prevTrigger) => prevTrigger + 1);
              }}
              aria-label="Select all"
            />
            {/* <ButtonDeleteAll
              onClick={() => setIsDelete(true)}
              className="w-6 bg-blue-300"
            /> */}
          </div>
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row?.getIsSelected()}
            onChange={(value) => {
              row.toggleSelected(value.target.checked);
              setTrigger((prevTrigger) => prevTrigger + 1);
            }}
            aria-label="Select row"
          />
        ),
      }),
      columnHelper.accessor((row) => row.username, {
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
      columnHelper.accessor((row) => row.role, {
        id: 'Role',
        header: ({ column }) => (
          <SortingHeader
            label="Role"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          />
        ),
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.list_menu, {
        id: 'Menu',
        header: ({ column }) => (
          <SortingHeader
            label="Menu"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          />
        ),
        cell: (info) => {
          const menus = info.getValue();

          return (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <ul className="list-disc">
                {menus.length > 0
                  ? menus?.map((menu, index) => <li key={index}>{menu?.menu_name.toString()}</li>)
                  : 'All Menu'}
              </ul>
            </div>
          );
        },
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.list_menu, {
        id: 'Permission',
        header: ({ column }) => (
          <SortingHeader
            label="Permission"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          />
        ),
        cell: (info) => {
          const menus = info?.getValue();

          return (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              {menus.length > 0
                ? menus?.map((menu, index) => (
                    <ul className="list-disc" key={`menu-${index}`}>
                      <li key={index}>
                        {menu.permissions ? menu.permissions.join(', ') : 'No Permissions'}
                      </li>
                    </ul>
                  ))
                : 'All Permission'}
            </div>
          );
        },
        footer: (info) => info.column.id,
      }),
      columnHelper.display({
        id: 'action',
        header: 'Action',
        cell: ({ cell }) => (
          <>
            <ButtonEdit onClick={editHandler?.(cell.row.original)} />
            <ButtonDelete onClick={() => deleteHandler?.(cell.row.original)} />
          </>
        ),
      }),
      columnHelper.display({
        id: 'resetPassword',
        header: 'Reset Password',
        cell: ({ cell }) => (
          <ButtonResetPassword
            onClick={() => resetPasswordHandler(cell.row.original.username)}
            label="Reset Password"
          />
        ),
      }),
    ];
  }, []);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel<ITableUserManagement[]>(),
    getSortedRowModel: getSortedRowModel<ITableUserManagement[]>(),
  });

  const isTableData = useMemo(() => {
    return table.getRowModel().rows.length > 0;
  }, [dataSource]);

  return { table, isTableData };
}
