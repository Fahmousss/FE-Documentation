import ButtonDelete from '@/shared/button/components/button-delete';
import ButtonEdit from '@/shared/button/components/button-edit';
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';

export interface IBrand {
  id: number;
  brand_name: string;
}

const FAKE_DATA_BRAND: IBrand[] = [
  { id: 1, brand_name: 'ElectroMax' },
  { id: 2, brand_name: 'TechNova' },
  { id: 3, brand_name: 'Inova Elektrik' },
  { id: 4, brand_name: 'MegaPower' },
  { id: 5, brand_name: 'SmartCore' },
  { id: 6, brand_name: 'Voltra' },
  { id: 7, brand_name: 'NeoWatt' },
  { id: 8, brand_name: 'Enerlogic' },
  { id: 9, brand_name: 'PowerHub' },
  { id: 10, brand_name: 'DigiSpark' },
];

const columnHelper = createColumnHelper<IBrand>();

export default function useTableBrand({ deleteHandler, editHandler, dataSource }) {
  const data = useMemo(() => {
    return dataSource ?? FAKE_DATA_BRAND;
  }, [dataSource]);

  const columns = useMemo(() => {
    return [
      columnHelper.accessor((row) => row.id, {
        id: 'no',
        header: () => 'No',
        cell: (info) => info.cell.row.index + 1,
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.brand_name, {
        id: 'Brand Name',
        header: () => 'Brand Name',
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.display({
        id: 'action',
        header: 'Action',
        cell: ({ cell }) => (
          <>
            <ButtonEdit onClick={() => editHandler?.(cell.row.original)} />
            <ButtonDelete onClick={() => deleteHandler?.(cell.row.original)} />
          </>
        ),
      }),
    ];
  }, []);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel<IBrand[]>(),
    getSortedRowModel: getSortedRowModel<IBrand[]>(),
  });

  const isTableData = useMemo(() => {
    return table.getRowModel().rows.length > 0;
  }, [dataSource]);

  return { table, isTableData };
}
