import { useMessageContext } from '@/core/hooks/use-message-context';
import axios from '@/core/utils/axios.utils';
import { useMutation } from '@tanstack/react-query';

export default function useMutationBrand() {
  const { openMessage } = useMessageContext();

  const {
    mutateAsync: addBrand,
    isPending: isPendingAddBrand,
    isError: isErrorAddBrand,
    isSuccess: isSuccessAddBrand,
  } = useMutation({
    mutationFn: ({ name }: { name: string }) => {
      return axios.post('/brand', { name });
    },
    onSuccess: () => {
      openMessage({
        message: 'Success Add Brand',
        mode: 'success',
        title: 'Success',
      });
    },
    onError: () => {
      openMessage({
        message: 'Error Add Brand',
        mode: 'danger',
        title: 'Error',
      });
    },
  });

  // Edit Brand
  const {
    mutateAsync: editBrand,
    isPending: isPendingEditBrand,
    isError: isErrorEditBrand,
    isSuccess: isSuccessEditBrand,
  } = useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) => {
      return axios.put(`/brand/${id}`, { name });
    },
    onSuccess: () => {
      openMessage({
        message: 'Success Edit Brand',
        mode: 'success',
        title: 'Success',
      });
    },
    onError: () => {
      openMessage({
        message: 'Error Edit Brand',
        mode: 'danger',
        title: 'Error',
      });
    },
  });

  //   Delete Brand
  const {
    mutateAsync: deleteBrand,
    isPending: isPendingDeleteBrand,
    isError: isErrorDeleteBrand,
    isSuccess: isSuccessDeleteBrand,
  } = useMutation({
    mutationFn: (id: number) => {
      return axios.delete(`/brand/${id}`);
    },
    onSuccess: () => {
      openMessage({
        message: 'Success Delete Brand',
        mode: 'success',
        title: 'Success',
      });
    },
    onError: () => {
      openMessage({
        message: 'Error Delete Brand',
        mode: 'danger',
        title: 'Error',
      });
    },
  });

  return {
    addBrand,
    isPendingAddBrand,
    isErrorAddBrand,
    isSuccessAddBrand,
    editBrand,
    isPendingEditBrand,
    isErrorEditBrand,
    isSuccessEditBrand,
    deleteBrand,
    isPendingDeleteBrand,
    isErrorDeleteBrand,
    isSuccessDeleteBrand,
  };
}
