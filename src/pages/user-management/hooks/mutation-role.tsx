import { useMessageContext } from '@/core/hooks/use-message-context';
import axios from '@/core/utils/axios.utils';
import { useMutation } from '@tanstack/react-query';

export default function useMutationRole() {
  const { openMessage } = useMessageContext();

  const {
    mutateAsync: addRole,
    isPending: isPendingAddRole,
    isError: isErrorAddRole,
    isSuccess: isSuccessAddRole,
  } = useMutation({
    mutationFn: ({ name }: { name: string }) => {
      return axios.post('/role', { name });
    },
    onSuccess: () => {
      openMessage({
        message: 'Success Add Role',
        mode: 'success',
        title: 'Success',
      });
    },
    onError: () => {
      openMessage({
        message: 'Error Add Role',
        mode: 'danger',
        title: 'Error',
      });
    },
  });

  return {
    addRole,
    isPendingAddRole,
    isErrorAddRole,
    isSuccessAddRole,
  };
}
