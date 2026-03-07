import usePagination from '@/core/hooks/use-pagination';
import { HTTPResponse, QueryFnParams } from '@/core/models/http.types';
import axios from '@/core/utils/axios.utils';
import { createUrlWithQueryParams, getPaginationHeaders } from '@/core/utils/global.utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { IUser } from '../utils/model';

export default function useUserPaginated() {
  const queryClient = useQueryClient();
  const { PageNumber, PageSize, SearchTerm, setPageNumber, setPageSize, setSearchTerm } =
    usePagination();
  const queryKey = [
    createUrlWithQueryParams('/get-users-paginated', {
      PageSize,
      PageNumber,
      SearchTerm,
    }),
  ];
  const queryFn = ({ queryKey }: QueryFnParams) => {
    return axios.get<HTTPResponse<IUser[]>>(queryKey[0]);
  };
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey,
    queryFn,
  });
  const pagination = getPaginationHeaders(data);
  useEffect(() => {
    const nextQueryKey = [
      createUrlWithQueryParams('/get-users-paginated', {
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
    dataUser: data?.data?.data,
    refetchUser: refetch,
    isLoadingUser: isLoading,
    isErrorUser: isError,
    pagination,
    filters: {
      setPageNumber,
      setPageSize,
      setSearchTerm,
    },
  };
}
