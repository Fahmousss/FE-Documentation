import { useMessageContext } from '@/core/hooks/use-message-context';
import { HTTPResponse } from '@/core/models/http.types';
import axios from '@/core/utils/axios.utils';
import { useMutation } from '@tanstack/react-query';
import { RoleBody } from '../utils/model';

export default function useRoleMutation() {
  const { openMessage } = useMessageContext();
  const { mutateAsync: createRole, isPending: isPendingCreateRole } = useMutation({
    mutationFn: (body: RoleBody) => {
      return axios.post<HTTPResponse<string>>('/roles', body);
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
  const { mutateAsync: updateRole, isPending: isPendingUpdateRole } = useMutation({
    mutationFn: ({ body, id }: { body: RoleBody; id: string }) => {
      return axios.put<HTTPResponse<string>>(`/roles/${id}`, body);
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
  const { mutateAsync: deleteRole, isPending: isPendingDeleteRole } = useMutation({
    mutationFn: (id: string) => {
      return axios.delete<HTTPResponse<string>>(`/roles/${id}`);
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
    createRole,
    isPendingCreateRole,
    updateRole,
    isPendingUpdateRole,
    deleteRole,
    isPendingDeleteRole,
  };
}
