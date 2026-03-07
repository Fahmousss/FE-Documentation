import useJwt from '@/core/hooks/use-jwt';
import { HTTPResponse } from '@/core/models/http.types';
import axios from '@/core/utils/axios.utils';
import { createUrlWithQueryParams } from '@/core/utils/global.utils';
import { useQuery } from '@tanstack/react-query';
import { ISidebarServer, useSidebarProps } from '../utils/models';

export default function useSidebar({ section_id, dis, search }: useSidebarProps) {
  const { user_id } = useJwt();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [
      createUrlWithQueryParams(`/sidebar/${user_id}`, {
        sectionId: section_id,
        searchTerm: search,
      }),
    ],
    queryFn: ({ queryKey }) => {
      return axios.get<HTTPResponse<ISidebarServer[]>>(queryKey[0]);
    },
    select: (data) => {
      return {
        dataSidebar: data.data.data,
        length: data.data.data.length,
      };
    },
    enabled: dis,
  });

  return {
    dataSidebar: data?.dataSidebar,
    isLoadingSidebar: isLoading,
    isErrorSidebar: isError,
    refetchSidebar: refetch,
    length: data?.length ?? 0,
  };
}
