import { useTableParams } from '@/core/models/use-table.Types';
import { ITest } from '@/core/models/xample-dashboard.models';
import ButtonDelete from '@/shared/button/components/button-delete';
import ButtonEdit from '@/shared/button/components/button-edit';
import ButtonView from '@/shared/button/components/button-view';
import SortingHeader from '@/shared/table/components/sorting-header';
import {
  AccessorFnColumnDef,
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Checkbox } from 'antd';
import { useMemo } from 'react';

const columnHelper = createColumnHelper<ITest>();

interface useTableTestProps extends useTableParams<ITest[]> {
  section: string;
}

export default function useTableTest({
  deleteHandler,
  editHandler,
  viewHandler,
  dataSource,
  section,
}: useTableTestProps) {
  const data = useMemo(() => {
    return dataSource;
  }, []);

  const columns = useMemo(() => {
    const address = [
      columnHelper.accessor((row) => row.street, {
        id: 'street',
        header: ({ column }) => (
          <SortingHeader
            label="Street"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          />
        ),
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.city, {
        id: 'city',
        header: ({ column }) => (
          <SortingHeader
            label="City"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          />
        ),
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.province, {
        id: 'province',
        header: ({ column }) => (
          <SortingHeader
            label="Province"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          />
        ),
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.nation, {
        id: 'nation',
        header: ({ column }) => (
          <SortingHeader
            label="Nation"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          />
        ),
        cell: (info) => info.renderValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.postal_code, {
        id: 'postal_code',
        header: ({ column }) => (
          <SortingHeader
            label="Postal Code"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          />
        ),
        cell: (info) => info.renderValue(),
        footer: (info) => info.column.id,
      }),
    ];
    const basic = [
      columnHelper.accessor((row) => row.first_name, {
        id: 'first_name',
        header: ({ column }) => (
          <SortingHeader
            label="First Name"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          />
        ),
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.last_name, {
        id: 'last_name',
        header: ({ column }) => (
          <SortingHeader
            label="Last Name"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          />
        ),
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.full_name, {
        id: 'full_name',
        header: ({ column }) => (
          <SortingHeader
            label="Full Name"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          />
        ),
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.email, {
        id: 'email',
        header: ({ column }) => (
          <SortingHeader
            label="Email"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          />
        ),
        cell: (info) => info.renderValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.age, {
        id: 'age',
        header: ({ column }) => (
          <SortingHeader
            label="Age"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          />
        ),
        cell: (info) => info.renderValue(),
        footer: (info) => info.column.id,
      }),
    ];
    const job = [
      columnHelper.accessor((row) => row.job_title, {
        id: 'job_title',
        header: ({ column }) => (
          <SortingHeader
            label="Job Title"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          />
        ),
        cell: (info) => info.renderValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.company_name, {
        id: 'company_name',
        header: ({ column }) => (
          <SortingHeader
            label="Company Name"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          />
        ),
        cell: (info) => info.renderValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.company_address, {
        id: 'company_address',
        header: ({ column }) => (
          <SortingHeader
            label="Company Address"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          />
        ),
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.work_email, {
        id: 'work_email',
        header: ({ column }) => (
          <SortingHeader
            label="Work Email"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          />
        ),
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      }),
    ];

    const temp: { [label: string]: AccessorFnColumnDef<ITest, string | number>[] } = {
      basic,
      address,
      job,
    };
    const activeSection = temp[section] ?? [];
    return [
      columnHelper.display({
        id: 'select',
        header: ({ table }) => (
          <div className="w-full flex items-center justify-center">
            <Checkbox
              checked={table.getIsAllPageRowsSelected()}
              onChange={(value) => table.toggleAllPageRowsSelected(value.target.checked)}
              aria-label="Select all"
              className="mx-auto"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="w-full flex items-center justify-center">
            <Checkbox
              checked={row.getIsSelected()}
              onChange={(value) => row.toggleSelected(value.target.checked)}
              aria-label="Select row"
              className="mx-auto"
            />
          </div>
        ),
      }),
      ...activeSection,
      columnHelper.display({
        id: 'action',
        header: 'Action',
        cell: ({ cell }) => (
          <>
            <ButtonView onClick={() => viewHandler?.(cell.row.original)} />
            <ButtonEdit onClick={() => editHandler?.(cell.row.original)} />
            <ButtonDelete onClick={() => deleteHandler?.(cell.row.original)} />
          </>
        ),
      }),
    ];
  }, [section]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel<ITest[]>(),
    getSortedRowModel: getSortedRowModel<ITest[]>(),
  });

  const isTableData = useMemo(() => {
    return table.getRowModel().rows.length > 0;
  }, []);

  return { table, isTableData };
}
