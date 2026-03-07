import { HTTPResponse } from '@/core/models/http.types';
import axios from '@/core/utils/axios.utils';
import { useQuery } from '@tanstack/react-query';
import { IBrand } from './use-table-brand';

export default function useFetchBrand() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['brand'],
    queryFn: async ({ queryKey }) => {
      return axios.get<HTTPResponse<IBrand[]>>(queryKey[0]);
    },
  });

  return {
    dataBrand: data?.data?.data,
    isLoadingBrand: isLoading,
    isErrorBrand: isError,
    refetchBrand: refetch,
  };
}
