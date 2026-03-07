import { HTTPResponse } from '@/core/models/http.types';
import axios from '@/core/utils/axios.utils';
import { useQuery } from '@tanstack/react-query';

interface IApplicationThemeServer {
  id: string;
  color: string;
}

export default function useApplicationTheme() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['/color-theme'],
    queryFn: async ({ queryKey }) => {
      return axios.get<HTTPResponse<IApplicationThemeServer>>(queryKey[0]);
    },
  });

  return {
    dataApplicationTheme: data?.data?.data,
    isLoadingApplicationTheme: isLoading,
    isErrorApplicationTheme: isError,
    refetchApplicationTheme: refetch,
  };
}
