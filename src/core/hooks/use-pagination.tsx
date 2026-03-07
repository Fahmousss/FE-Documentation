import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_LIMIT } from '@/core/constant/config.constant';
import debounce from 'lodash.debounce';
import { useEffect, useMemo, useState } from 'react';

export default function usePagination() {
  const [PageNumber, setPageNumber] = useState<number>(DEFAULT_PAGE_INDEX);
  const [PageSize, setPageSize] = useState<number>(DEFAULT_PAGE_LIMIT);
  const [SearchTerm, setSearchTerm] = useState<string>('');

  const searchHandler = useMemo(() => {
    // console.log("test")
    return debounce(setSearchTerm, 300);
  }, []);

  useEffect(() => {
    return () => searchHandler.cancel();
  }, [searchHandler]);

  return {
    PageNumber,
    setPageNumber,
    PageSize,
    setPageSize,
    SearchTerm,
    setSearchTerm: searchHandler,
  };
}
