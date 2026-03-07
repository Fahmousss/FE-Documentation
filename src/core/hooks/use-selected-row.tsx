import { Table } from '@tanstack/react-table';

export default function useSelectedRow<T>(table: Table<T>) {
  return table.getSelectedRowModel().flatRows.map((item) => item.original);
}
