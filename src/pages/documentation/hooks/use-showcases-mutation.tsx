import { useMessageContext } from '@/core/hooks/use-message-context';
import { HTTPResponse } from '@/core/models/http.types';
import axios from '@/core/utils/axios.utils';
import { useMutation } from '@tanstack/react-query';
import { IShowcaseRequest } from '../utils/model';

export default function useShowcasesMutation() {
  const { openMessage } = useMessageContext();

  const { mutateAsync: createShowcase, isPending: isPendingCreateShowcase } = useMutation({
    mutationFn: (body: IShowcaseRequest) => {
      return axios.post<HTTPResponse<string>>('/showcases', body);
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

  const { mutateAsync: updateShowcase, isPending: isPendingUpdateShowcase } = useMutation({
    mutationFn: ({ body, id }: { body: IShowcaseRequest; id: string }) => {
      return axios.put<HTTPResponse<string>>(`/showcases/${id}`, body);
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

  const { mutateAsync: deleteShowcase, isPending: isPendingDeleteShowcase } = useMutation({
    mutationFn: (id: string) => {
      return axios.delete<HTTPResponse<string>>(`/showcases/${id}`);
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
    createShowcase,
    isPendingCreateShowcase,
    updateShowcase,
    isPendingUpdateShowcase,
    deleteShowcase,
    isPendingDeleteShowcase,
  };
}