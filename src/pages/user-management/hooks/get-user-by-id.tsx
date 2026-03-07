import { HTTPResponse } from '@/core/models/http.types';
import axios from '@/core/utils/axios.utils';
import { createUrlWithQueryParams } from '@/core/utils/global.utils';
import { useQuery } from '@tanstack/react-query';

export interface IGetUserById {
  id: string;
  username: string;
  role: string;
  list_menu: {
    menu_name: string;
    permissions: string[];
  }[];
}

export default function getUserById(id: string) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [
      createUrlWithQueryParams(`/users/getUserById/${id}`, {
        id,
      }),
    ],
    queryFn: async ({ queryKey }) => {
      return axios.get<HTTPResponse<IGetUserById>>(queryKey[0]);
    },
  });

  return {
    dataGetById: data?.data?.data,
    isLoadingMenu: isLoading,
    isErrorMenu: isError,
    refetchMenu: refetch,
  };
}
