import { useMessageContext } from '@/core/hooks/use-message-context';
import { HTTPResponse } from '@/core/models/http.types';
import axios from '@/core/utils/axios.utils';
import { useMutation } from '@tanstack/react-query';
import { UserBody } from '../utils/model';

export default function useUserMutation() {
  const { openMessage } = useMessageContext();
  const { mutateAsync: createUser, isPending: isPendingCreateUser } = useMutation({
    mutationFn: (body: UserBody) => {
      return axios.post<HTTPResponse<string>>('/users', body);
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
  const { mutateAsync: updateUser, isPending: isPendingUpdateUser } = useMutation({
    mutationFn: ({ body, id }: { body: UserBody; id: string }) => {
      return axios.put<HTTPResponse<string>>(`/users/${id}`, body);
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
  const { mutateAsync: deleteUser, isPending: isPendingDeleteUser } = useMutation({
    mutationFn: (id: string) => {
      return axios.delete<HTTPResponse<string>>(`/users/${id}`);
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
    createUser,
    isPendingCreateUser,
    updateUser,
    isPendingUpdateUser,
    deleteUser,
    isPendingDeleteUser,
  };
}
