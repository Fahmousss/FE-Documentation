import { QueryClient } from '@tanstack/react-query';
import axios from './axios.utils';

export const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      // refetchInterval: 30000,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      queryFn: async ({ queryKey }) => {
        const { data } = await axios.get(`${queryKey[0]}`);

        return data;
      },
    },
  },
});
