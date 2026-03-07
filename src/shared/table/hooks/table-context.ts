import { Pagination } from '@/core/models/http.types';
import { createContext, useContext } from 'react';

export interface TableContext {
  pagination: Pagination;
  setPageNumber?: (value: number) => void;
  setPageSize?: (value: number) => void;
  selectedRow?: number;
}

export const TableContext = createContext<TableContext | null>(null);

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error(' must be used within a TableProvider');
  }
  return context;
};
