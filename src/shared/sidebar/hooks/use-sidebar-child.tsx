import { USER_ID } from '@/core/constant/config.constant';
import { HTTPResponse } from '@/core/models/http.types';
import axios from '@/core/utils/axios.utils';
import { createUrlWithQueryParams } from '@/core/utils/global.utils';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { ISidebarServer, useSidebarChildProps } from '../utils/models';

export default function useSidebarChild({ parent_id, is_parent }: useSidebarChildProps) {
  const user_id = Cookies.get(USER_ID);


  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: [
      createUrlWithQueryParams('/sidebar/sidebar-child', {
        userId: user_id,
        parentId: parent_id,
      }),
    ],
    queryFn: ({ queryKey }) => {
      return axios.get<HTTPResponse<ISidebarServer[]>>(queryKey[0]);
    },
    enabled: !!is_parent,
  });

  return {
    dataSidebarChild: data?.data.data,
    isErrorSidebarChild: isError,
    isLoadingSidebarChild: isLoading,
    refetchSidebarChild: refetch,
  };
}
