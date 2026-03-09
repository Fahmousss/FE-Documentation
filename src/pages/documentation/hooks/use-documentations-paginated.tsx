import usePagination from '@/core/hooks/use-pagination';
import { HTTPResponse } from '@/core/models/http.types';
import axios from '@/core/utils/axios.utils';
import { createUrlWithQueryParams, getPaginationHeaders } from '@/core/utils/global.utils';
import { useQuery } from '@tanstack/react-query';
import { IDocumentationItem, IProductData } from '../utils/model';

export default function useDocumentationsPaginated(productId: string) {
  const {
    PageNumber,
    PageSize,
    SearchTerm,
    setPageNumber,
    setPageSize,
    setSearchTerm,
  } = usePagination();

  const url = createUrlWithQueryParams(
    `/products/docs`,
    {
      PageSize,
      PageNumber,
      SearchTerm,
    }
  );

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['docs', PageNumber, PageSize, SearchTerm],
    queryFn: () =>
      axios.get<HTTPResponse<IProductData>>(url),
  });

  const pagination = getPaginationHeaders(data);

  return {
    dataDocumentations: data?.data?.data?.items ?? [],
    refetchDocumentations: refetch,
    isLoadingDocumentations: isLoading,
    isErrorDocumentations: isError,
    pagination,
    filters: {
      setPageNumber,
      setPageSize,
      setSearchTerm,
    },
  };
}