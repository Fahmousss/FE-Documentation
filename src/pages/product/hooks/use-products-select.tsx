import { HTTPResponse } from '@/core/models/http.types';
import axios from '@/core/utils/axios.utils';
import { useQuery } from '@tanstack/react-query';

export interface IProductSelect {
  id: string;
  name: string;
}

export default function useProductsSelect() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['products-select'],
    queryFn: () => axios.get<HTTPResponse<IProductSelect[]>>('/products/select'),
  });

  return {
    dataProductsSelect: data?.data?.data || [],
    isLoadingProductsSelect: isLoading,
    isErrorProductsSelect: isError,
    refetchProductsSelect: refetch,
  };
}
