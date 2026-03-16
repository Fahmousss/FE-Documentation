import { useMessageContext } from '@/core/hooks/use-message-context';
import { HTTPResponse } from '@/core/models/http.types';
import axios from '@/core/utils/axios.utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IBlogRequest } from '../utils/model';

export default function useBlogMutation() {
  const { openMessage } = useMessageContext();
  const queryClient = useQueryClient();

  // Blog menggunakan PUT (upsert) sesuai endpoint
  const { mutateAsync: updateBlog, isPending: isPendingUpdateBlog } = useMutation({
    mutationFn: ({ body, productId }: { body: IBlogRequest; productId: string }) => {
      return axios.put<HTTPResponse<string>>(`/products/${productId}/blog`, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs-by-product'] });
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

  const { mutateAsync: deleteBlog, isPending: isPendingDeleteBlog } = useMutation({
    mutationFn: (productId: string) => {
      return axios.delete<HTTPResponse<string>>(`/products/${productId}/blog`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs-by-product'] });
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
    updateBlog,
    isPendingUpdateBlog,
    deleteBlog,
    isPendingDeleteBlog,
  };
}