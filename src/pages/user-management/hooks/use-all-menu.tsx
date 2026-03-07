import { HTTPResponse } from '@/core/models/http.types';
import axios from '@/core/utils/axios.utils';
import { useQuery } from '@tanstack/react-query';

export interface IMenu {
  menu_name: string;
}

export default function useAllMenu() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['/permission/get-all-permission'],
    queryFn: ({ queryKey }) => {
      return axios.get<HTTPResponse<IMenu[]>>(queryKey[0]);
    },
  });

  return {
    dataMenu: data?.data?.data,
    isLoadingMenu: isLoading,
    isErrorMenu: isError,
    refetchMenu: refetch,
  };
}
