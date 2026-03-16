import { HTTPResponse } from '@/core/models/http.types';
import axios from '@/core/utils/axios.utils';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { IBlogItem, IBlogResponseSection } from '../utils/model';

export const mapBlogResponseToLocalState = (items: IBlogResponseSection[]): IBlogItem[] => {
  if (!items || items.length === 0) return [];

  return items.map((item) => ({
    id: item.id,
    name: item.title || '',
    title: item.title || '',
    publishDate: item.publishDate ? dayjs(item.publishDate) : null,
    description: item.description || '',
    content: item.content || '',
    heroImage: item.heroImageUrl || null,
    creators: item.creators && item.creators.length > 0 
      ? item.creators.map((c) => ({
          name: c.name || '',
          photoUrl: c.photoUrl || null,
        }))
      : [{ name: '', photoUrl: null }],
    sortOrder: item.sortOrder || 0,
  }));
};

export default function useBlogsByProduct(productId?: string) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['blogs-by-product', productId],
    queryFn: () => axios.get<HTTPResponse<{ sections: IBlogResponseSection[] }>>(`/products/${productId}/blog`),
    enabled: !!productId,
  });

  const structuredBlogs = useMemo(() => {
    return data?.data?.data?.sections ? mapBlogResponseToLocalState(data.data.data.sections) : undefined;
  }, [data]);

  return {
    dataBlogs: structuredBlogs,
    isLoadingBlogs: isLoading,
    isErrorBlogs: isError,
    refetchBlogs: refetch,
  };
}
