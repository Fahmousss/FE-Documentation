export interface HTTPResponse<T> {
  status: number;
  data: T;
  messages: string[];
}

export interface Pagination {
  PageNumber: number;
  HasNext: boolean;
  HasPrevious: boolean;
  PageSize: number;
  TotalCount: number;
  TotalPages: number;
}

export interface QueryFnParams {
  queryKey: string[];
}
