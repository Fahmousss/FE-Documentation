import { useMessageContext } from '@/core/hooks/use-message-context';
import { HTTPResponse } from '@/core/models/http.types';
import axios from '@/core/utils/axios.utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';  
import { IDocumentationRequest } from '../utils/model';

export default function useDocumentationsMutation() {
  const { openMessage } = useMessageContext();
  const queryClient = useQueryClient();
  const { mutateAsync: createDocumentations, isPending: isPendingCreateDocumetations } = useMutation({
    mutationFn: (body: IDocumentationRequest) => {
      return axios.post<HTTPResponse<string>>('/docs', body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['docs-by-product'] });
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
  const { mutateAsync: updateDocumetations, isPending: isPendingUpdateDocumetations } = useMutation({
    mutationFn: ({ body, id }: { body: IDocumentationRequest; id: string }) => {
      return axios.put<HTTPResponse<string>>(`/docs/${id}`, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['docs-by-product'] });
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
  const { mutateAsync: bulkUpdateDocumentations, isPending: isPendingBulkUpdateDocumentations } = useMutation({
    mutationFn: ({ body, productId }: { body: IDocumentationRequest; productId: string }) => {
      // The payload structure matches {"sections": [...]} and the URL gets the productId.
      return axios.put<HTTPResponse<string>>(`/products/${productId}/docs`, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['docs-by-product'] });
      openMessage({
        title: 'Success',
        mode: 'success',
        message: 'Data updated successfully',
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
  const { mutateAsync: deleteDocumetations, isPending: isPendingDeleteDocumetations } = useMutation({
    mutationFn: (id: string) => {
      return axios.delete<HTTPResponse<string>>(`/docs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['docs-by-product'] });
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
    createDocumentations,
    isPendingCreateDocumetations,
    updateDocumetations,
    isPendingUpdateDocumetations,
    deleteDocumetations,
    isPendingDeleteDocumetations,
    bulkUpdateDocumentations,
    isPendingBulkUpdateDocumentations,
  };
}
