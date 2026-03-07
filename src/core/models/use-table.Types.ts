export interface useTableParams<T> {
  dataSource: T;
  viewHandler?: (...args: any[]) => void;
  deleteHandler?: (...args: any[]) => void;
  editHandler?: (...args: any[]) => void;
  bulkActionHandler?: (...args: any[]) => void;
}
