import { useMessageContext } from '@/core/hooks/use-message-context';
import { HTTPResponse } from '@/core/models/http.types';
import axios from '@/core/utils/axios.utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IShowcaseRequest } from '../utils/model';

export default function useShowcasesMutation() {
  const { openMessage } = useMessageContext();
  const queryClient = useQueryClient();

  const { mutateAsync: createShowcase, isPending: isPendingCreateShowcase } = useMutation({
    mutationFn: (body: IShowcaseRequest) => {
      return axios.post<HTTPResponse<string>>('/showcases', body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['showcases-by-product'] });
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

  const { mutateAsync: updateShowcase, isPending: isPendingUpdateShowcase } = useMutation({
    mutationFn: ({ body, id }: { body: IShowcaseRequest; id: string }) => {
      return axios.put<HTTPResponse<string>>(`/showcases/${id}`, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['showcases-by-product'] });
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

  const { mutateAsync: deleteShowcase, isPending: isPendingDeleteShowcase } = useMutation({
    mutationFn: (id: string) => {
      return axios.delete<HTTPResponse<string>>(`/showcases/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['showcases-by-product'] });
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

  const { mutateAsync: bulkUpdateShowcase, isPending: isPendingBulkUpdateShowcase } = useMutation({
    mutationFn: ({ body, productId }: { body: IShowcaseRequest; productId: string }) => {
      return axios.put<HTTPResponse<string>>(`/products/${productId}/showcase`, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['showcases-by-product'] });
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

  return {
    createShowcase,
    isPendingCreateShowcase,
    updateShowcase,
    isPendingUpdateShowcase,
    deleteShowcase,
    isPendingDeleteShowcase,
    bulkUpdateShowcase,
    isPendingBulkUpdateShowcase,
  };
}
