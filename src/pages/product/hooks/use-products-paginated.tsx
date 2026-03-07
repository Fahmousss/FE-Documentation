import usePagination from '@/core/hooks/use-pagination';
import { HTTPResponse, QueryFnParams } from '@/core/models/http.types';
import axios from '@/core/utils/axios.utils';
import { createUrlWithQueryParams, getPaginationHeaders } from '@/core/utils/global.utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { IProducts } from '../utils/model';

export default function useProductsPaginated() {
  const { PageNumber, PageSize, SearchTerm, setPageNumber, setPageSize, setSearchTerm } =
    usePagination();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [
      createUrlWithQueryParams('/products', {
        PageSize,
        PageNumber,
        SearchTerm,
      }),
    ],
    queryFn: ({ queryKey }) => {
      return axios.get<HTTPResponse<IProducts[]>>(queryKey[0]);
    },
  });

  const pagination = getPaginationHeaders(data);

  return {
    dataProducts: data?.data?.data?.items,
    refetchProducts: refetch,
    isLoadingProducts: isLoading,
    isErrorProducts: isError,
    pagination,
    filters: {
      setPageNumber,
      setPageSize,
      setSearchTerm,
    },
  };
}
