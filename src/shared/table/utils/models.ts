import {
  Dispatch,
  FC,
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
  SetStateAction,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from 'react';
import { TableLoaderProps } from '../components/table-loader';
import { TableContext } from '../hooks/table-context';

export interface TableProps extends HTMLAttributes<HTMLTableElement>, Partial<TableContext> {
  // Important
  data?: any[];
  isTableData?: boolean;
  isLoading: boolean;

  // Optional
  height?: string;
  loaderRows?: number;
  loaderColumns?: number;
}

export interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {}
export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {}
export interface TableFooterProps extends HTMLAttributes<HTMLTableSectionElement> {}
export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {}
export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  isNumber?: boolean;
  isAction?: boolean;
  isSelect?: boolean;
}
export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  isAction?: boolean;
  isNumber?: boolean;
  isSelect?: boolean;
  actionClassName?: string;
}
export interface TableCaptionProps extends HTMLAttributes<HTMLTableCaptionElement> {}

export interface PaginationProps {
  setPage?: Dispatch<SetStateAction<number>>;
  setLimit?: Dispatch<SetStateAction<number>>;
}

export interface TableComponent
  extends ForwardRefExoticComponent<TableProps & RefAttributes<HTMLTableElement>> {
  Header: ForwardRefExoticComponent<TableHeaderProps & RefAttributes<HTMLTableSectionElement>>;
  Body: ForwardRefExoticComponent<TableBodyProps & RefAttributes<HTMLTableSectionElement>>;
  Footer: ForwardRefExoticComponent<TableFooterProps & RefAttributes<HTMLTableSectionElement>>;
  Row: ForwardRefExoticComponent<TableRowProps & RefAttributes<HTMLTableRowElement>>;
  Head: ForwardRefExoticComponent<TableHeadProps & RefAttributes<HTMLTableCellElement>>;
  Cell: ForwardRefExoticComponent<TableCellProps & RefAttributes<HTMLTableCellElement>>;
  Caption: ForwardRefExoticComponent<TableCaptionProps & RefAttributes<HTMLTableCaptionElement>>;
  Pagination: FC<PaginationProps>;
  Blank: FC;
  Loader: React.ComponentType<TableLoaderProps>;
}

export interface SortingHeader {
  label: string;
  onClick?: () => void;
}
