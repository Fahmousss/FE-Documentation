import { HTTPResponse } from '@/core/models/http.types';
import axios from '@/core/utils/axios.utils';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { IShowcaseItem, IShowcaseResponse } from '../utils/model';

export default function useShowcasesByProduct(productId?: string) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['showcases-by-product', productId],
    queryFn: () => axios.get<IShowcaseResponse>(`/products/${productId}/showcase`),
    enabled: !!productId,
  });

  const structuredShowcases = useMemo(() => {
    const items = data?.data?.data?.items;
    if (!items || items.length === 0) return undefined;

    return items.map((item, i) => {
      // Return structured item for internal state
      const mapped: IShowcaseItem = {
        id: item.id,
        name: `Showcase ${i + 1}`,
        photo: item.media_url, // Maps to URL, normally expects File for new uploads. The UI should accommodate string or File.
        publishDate: item.publish_date,
        title: item.title,
        description: item.description,
        content: item.content,
        sortOrder: item.sort_order,
      };
      return mapped;
    });
  }, [data]);

  return {
    dataShowcases: structuredShowcases,
    isLoadingShowcases: isLoading,
    isErrorShowcases: isError,
    refetchShowcases: refetch,
  };
}
