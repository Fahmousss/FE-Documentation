import useJwt from '@/core/hooks/use-jwt';
import { HTTPResponse } from '@/core/models/http.types';
import axios from '@/core/utils/axios.utils';
import { createUrlWithQueryParams } from '@/core/utils/global.utils';
import { useQuery } from '@tanstack/react-query';
import { ISection } from '../utils/models';

export default function useSection() {
  const { user_id } = useJwt();

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
