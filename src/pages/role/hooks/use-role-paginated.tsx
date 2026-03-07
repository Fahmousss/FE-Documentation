import usePagination from '@/core/hooks/use-pagination';
import { HTTPResponse, QueryFnParams } from '@/core/models/http.types';
import axios from '@/core/utils/axios.utils';
import { createUrlWithQueryParams, getPaginationHeaders } from '@/core/utils/global.utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { IRole } from '../utils/model';

export default function useRolePaginated() {
  const queryClient = useQueryClient();
  const { PageNumber, PageSize, SearchTerm, setPageNumber, setPageSize, setSearchTerm } =
    usePagination();
  const queryKey = [
    createUrlWithQueryParams('/get-roles-paginated', {
      PageSize,
      PageNumber,
      SearchTerm,
    }),
  ];
  const queryFn = ({ queryKey }: QueryFnParams) => {
    return axios.get<HTTPResponse<IRole[]>>(queryKey[0]);
  };
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey,
    queryFn,
  });

  const pagination = getPaginationHeaders(data);

  useEffect(() => {
    const nextQueryKey = [
      createUrlWithQueryParams('/get-roles-paginated', {
        PageSize,
        PageNumber: PageNumber + 1,
        SearchTerm,
      }),
    ];

    queryClient.prefetchQuery({
      queryKey: nextQueryKey,
      queryFn,
    });
  }, [PageSize, PageNumber, SearchTerm, queryClient]);

  return {
    dataRole: data?.data?.data,
    refetchRole: refetch,
    isLoadingRole: isLoading,
    isErrorRole: isError,
    pagination,
    filters: {
      setPageNumber,
      setPageSize,
      setSearchTerm,
    },
  };
}
