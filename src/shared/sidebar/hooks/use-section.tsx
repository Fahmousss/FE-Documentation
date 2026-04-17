import { USER_ID } from '@/core/constant/config.constant';
import { HTTPResponse } from '@/core/models/http.types';
import axios from '@/core/utils/axios.utils';
import { createUrlWithQueryParams } from '@/core/utils/global.utils';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { ISection } from '../utils/models';

export default function useSection() {
  const user_id = Cookies.get(USER_ID);


  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [
      createUrlWithQueryParams('section/get-list-section', {
        userId: user_id,
      }),
    ],
    queryFn: ({ queryKey }) => {
      return axios.get<HTTPResponse<ISection[]>>(queryKey[0]);
    },
    enabled: !!user_id,
  });

  return {
    dataSection: data?.data.data,
    isLoadingSection: isLoading,
    isErrorSection: isError,
    // statusCode: data?.data.statusCode,
    refetchSection: refetch,
  };
}
