import usePagination from '@/core/hooks/use-pagination';
import { HTTPResponse } from '@/core/models/http.types';
import axios from '@/core/utils/axios.utils';
import { createUrlWithQueryParams, getPaginationHeaders } from '@/core/utils/global.utils';
import { useQuery } from '@tanstack/react-query';
import { ITableUserManagement } from '../utils/model';

export default function useUserManagement() {
  const { PageNumber, PageSize, SearchTerm, setSearchTerm, setPageNumber, setPageSize } =
    usePagination();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [
      createUrlWithQueryParams('/users/list-users', {
        PageNumber,
        PageSize,
        SearchTerm,
      }),
    ],
    queryFn: async ({ queryKey }) => {
      return axios.get<HTTPResponse<ITableUserManagement[]>>(queryKey[0]);
    },
  });

  const pagination = getPaginationHeaders(data);

  return {
    dataUserManagement: data?.data?.data,
    isLoadingUserManagement: isLoading,
    isErrorUserManagement: isError,
    refetchUserManagement: refetch,
    pagination,
    filters: {
      setPageNumber,
      setPageSize,
      setSearchTerm,
    },
  };
}
