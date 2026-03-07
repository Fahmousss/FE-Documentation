import useDateFilter from '@/core/hooks/use-date-filter';
import usePagination from '@/core/hooks/use-pagination';
import { HTTPResponse, Pagination } from '@/core/models/http.types';
import { ITest } from '@/core/models/xample-dashboard.models';
import axios from '@/core/utils/axios.utils';
import { createUrlWithQueryParams } from '@/core/utils/global.utils';
import { DATA } from '@/core/utils/xample-dashboard.utils';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export default function useFetchTest() {
  const { PageNumber, PageSize, SearchTerm, setPageNumber, setPageSize, setSearchTerm } =
    usePagination();

  const { End, Start, filters } = useDateFilter();
  const { setEnd, setStart } = filters;
  const [isLoadingTest, setIsLoadingTest] = useState(true);

  useEffect(() => {
    setStart(dayjs().subtract(7, 'days').format('YYYY-MM-DD HH:mm:ss'));
    setEnd(dayjs().format('YYYY-MM-DD HH:mm:ss'));
  }, []);

  const { data, isError } = useQuery({
    queryKey: [
      createUrlWithQueryParams('/api/test', {
        PageNumber,
        PageSize,
        SearchTerm,
        Start,
        End,
      }),
    ],
    queryFn: async ({ queryKey }) => {
      return await axios.get<HTTPResponse<ITest[]>>(queryKey[0]);
    },
    enabled: !!Start && !!End,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoadingTest(false);
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

  const pagination: Pagination = {
    HasNext: true,
    HasPrevious: false,
    PageNumber: 1,
    PageSize: 10,
    TotalCount: 10,
    TotalPages: 1,
  };

  return {
    dataTest: data?.data?.data ?? DATA,
    isErrorTest: isError,
    isLoadingTest,
    pagination,
    Start,
    End,
    filter: {
      setPageNumber,
      setPageSize,
      setSearchTerm,
      setStart,
      setEnd,
    },
  };
}
