import { ReactNode, useEffect } from 'react';
import { useTableContext } from '../../hooks/table-context';

const PaginationWrapper = ({ children }: { children: ReactNode }) => {
  const { pagination, setPageNumber } = useTableContext();

  const { PageSize, PageNumber, TotalPages } = pagination;

  useEffect(() => {
    if (TotalPages > 0) {
      if (TotalPages < PageNumber) {
        setPageNumber?.(TotalPages);
      }
    }
  }, [PageNumber, PageSize, TotalPages, setPageNumber]);
  return <div className="w-full flex justify-between items-center py-2 mt-5 px-3">{children}</div>;
};

export default PaginationWrapper;
