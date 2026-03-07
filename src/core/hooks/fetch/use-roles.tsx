import { HTTPResponse } from '@/core/models/http.types';
import axios from '@/core/utils/axios.utils';
import { useQuery } from '@tanstack/react-query';

export interface IRole {
  id: string;
  name: string;
}

export default function useRoles() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['/roles'],
    queryFn: ({ queryKey }) => {
      return axios.get<HTTPResponse<IRole[]>>(queryKey[0]);
    },
  });

  return {
    dataRoles: data?.data?.data,
    isLoadingDataRoles: isLoading,
    isErrorDataRoles: isError,
  };
}
