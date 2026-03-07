import useJwt from '@/core/hooks/use-jwt';
import { HTTPResponse } from '@/core/models/http.types';
import axios from '@/core/utils/axios.utils';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { ISidebarServer } from './use-sidebar';

export default function useSidebarPage() {
  const { id: name } = useParams();
  const { user_id } = useJwt();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['sidebar-page', name],
    queryFn: () => {
      return axios.get<HTTPResponse<ISidebarServer>>(`/sidebar`, {
        params: {
          name,
          user_id,
        },
      });
    },
  });
  return {
    dataSidebarPage: data?.data.data,
    isLoadingSidebarPage: isLoading,
    isErrorSidebarPage: isError,
    refetchSidebarPage: refetch,
  };
}
