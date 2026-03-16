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
import { IProductItem } from '../utils/model';

const columnHelper = createColumnHelper<IProductItem>();

// ─── Bullet list cell ─────────────────────────────────────
const BulletList = ({ items, fallback }: { items: string[]; fallback: string }) => {
  if (items.length === 0) {
    return <p className="text-xs text-neutral-400 italic">{fallback}</p>;
  }
  return (
    <ul className="space-y-0.5 text-xs text-neutral-700">
      {items.map((item, i) => (
        <li key={i} className="list-disc list-inside">
          {item}
        </li>
      ))}
    </ul>
  );
};

export default function useTableDocumentations({
  dataSource,
  editHandler,
  deleteHandler,
}: useTableParams<IProductItem[]>) {
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
      columnHelper.display({
        id: 'sections',
        header: ({ column }) => (
          <SortingHeader
            label="Sections"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          />
        ),
        cell: ({ row }) => {
          const names = (row.original.sections ?? []).map((s, i) => {
            return s ?? s ?? `Section ${i + 1}`;
          });

          return <BulletList items={names} fallback="No sections" />;
        },
        footer: (info) => info.column.id,
      }),
      columnHelper.display({
        id: 'showcases',
        header: ({ column }) => (
          <SortingHeader
            label="Showcases"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          />
        ),
        cell: ({ row }) => {
          const names = (row.original.showcases ?? []).map(
            (s: any, i: number) =>
              typeof s === 'string' ? s : s?.title ?? s?.name ?? `Showcase ${i + 1}`
          );
          return <BulletList items={names} fallback="No showcases" />;
        },
        footer: (info) => info.column.id,
      }),
      columnHelper.display({
        id: 'preferences',
        header: () => 'Preferences',
        cell: ({ row }) => {
          const pref = row.original.preferences;
          const sections = (pref?.sections ?? []).map(
            (s: any, i: number) => s?.name ?? s?.title ?? `Section ${i + 1}`
          );
          const items = (pref?.items ?? []).map(
            (it: any, i: number) => it?.name ?? it?.title ?? `Item ${i + 1}`
          );
          return (
            <div className="flex flex-col gap-2">
              {sections.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-neutral-500 mb-0.5">Sections</p>
                  <BulletList items={sections} fallback="" />
                </div>
              )}
              {items.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-neutral-500 mb-0.5">Items</p>
                  <BulletList items={items} fallback="" />
                </div>
              )}
              {sections.length === 0 && items.length === 0 && (
                <p className="text-xs text-neutral-400 italic">No preferences</p>
              )}
            </div>
          );
        },
        footer: (info) => info.column.id,
      }),
      columnHelper.display({
        id: 'blogs',
        header: ({ column }) => (
          <SortingHeader
            label="Blogs"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          />
        ),
        cell: ({ row }) => {
          const names = (row.original.blogs ?? []).map(
            (b: any, i: number) => b?.title ?? b?.name ?? `Blog ${i + 1}`
          );
          return <BulletList items={names} fallback="No blogs" />;
        },
        footer: (info) => info.column.id,
      }),
      columnHelper.display({
        id: 'action',
        header: () => 'Action',
        cell: ({ cell }) => (
          <>
            <ButtonEdit onClick={() => editHandler?.(cell.row.original)} />
            <ButtonDelete onClick={() => deleteHandler?.(cell.row.original)} />
          </>
        ),
        footer: (info) => info.column.id,
      }),
    ];
  }, [editHandler, deleteHandler]);

  const table = useReactTable({
    columns,
    data,
    autoResetPageIndex: false,
    getCoreRowModel: getCoreRowModel<IProductItem>(),
    getSortedRowModel: getSortedRowModel<IProductItem>(),
  });

  const isTableData = useMemo(() => data.length > 0, [data]);

  return { table, isTableData };
}