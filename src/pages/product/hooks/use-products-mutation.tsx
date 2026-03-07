import { useMessageContext } from '@/core/hooks/use-message-context';
import { HTTPResponse } from '@/core/models/http.types';
import axios from '@/core/utils/axios.utils';
import { useMutation } from '@tanstack/react-query'; 
import { ProductsBody } from '../utils/model';

export default function useProductsMutation() {
  const { openMessage } = useMessageContext();
  const { mutateAsync: createProducts, isPending: isPendingCreateProducts } = useMutation({
    mutationFn: (body: ProductsBody) => {
      return axios.post<HTTPResponse<string>>('/products', body);
    },
    onSuccess: () => {
      openMessage({
        title: 'Success',
        mode: 'success',
        message: 'Data created successfuly',
      });
    },
    onError: () => {
      openMessage({
        title: 'Error',
        mode: 'danger',
        message: 'Error create data!',
      });
    },
  });
  const { mutateAsync: updateProducts, isPending: isPendingUpdateProducts } = useMutation({
    mutationFn: ({ body, id }: { body: ProductsBody; id: string }) => {
      return axios.put<HTTPResponse<string>>(`/products/${id}`, body);
    },
    onSuccess: () => {
      openMessage({
        title: 'Success',
        mode: 'success',
        message: 'Data updated successfuly',
      });
    },
    onError: () => {
      openMessage({
        title: 'Error',
        mode: 'danger',
        message: 'Error update data!',
      });
    },
  });
  const { mutateAsync: deleteProducts, isPending: isPendingDeleteProducts } = useMutation({
    mutationFn: (id: string) => {
      return axios.delete<HTTPResponse<string>>(`/products/${id}`);
    },
    onSuccess: () => {
      openMessage({
        title: 'Success',
        mode: 'success',
        message: 'Data deleted successfuly',
      });
    },
    onError: () => {
      openMessage({
        title: 'Error',
        mode: 'danger',
        message: 'Error delete data!',
      });
    },
  });

  return {
    createProducts,
    isPendingCreateProducts,
    updateProducts,
    isPendingUpdateProducts,
    deleteProducts,
    isPendingDeleteProducts,
  };
}
