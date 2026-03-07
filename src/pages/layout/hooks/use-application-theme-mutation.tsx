import { useMessageContext } from '@/core/hooks/use-message-context';
import axios from '@/core/utils/axios.utils';
import { useMutation } from '@tanstack/react-query';

export interface IBodyApplicationTheme {
  id?: string;
  color: string;
}

export default function useApplicationThemeMutation() {
  const { openMessage } = useMessageContext();
  const {
    mutateAsync: addApplicationTheme,
    isSuccess: isSuccessAddApplicationTheme,
    isError: isErrorAddApplicationTheme,
    isPending: isPendingAddApplicationTheme,
  } = useMutation({
    mutationFn: async (body: IBodyApplicationTheme) => {
      return axios.post('/color-theme', body);
    },
    onSuccess: () => {
      openMessage({
        mode: 'success',
        title: 'Success',
        message: 'Success Add Application Theme',
      });
    },
    onError: () => {
      openMessage({
        mode: 'danger',
        title: 'Error',
        message: 'Error Add Application Theme',
      });
    },
  });
  const {
    mutateAsync: editApplicationTheme,
    isSuccess: isSuccessEditApplicationTheme,
    isError: isErrorEditApplicationTheme,
    isPending: isPendingEditApplicationTheme,
  } = useMutation({
    mutationFn: async (body: IBodyApplicationTheme) => {
      return axios.put('/color-theme', body);
    },
    onSuccess: () => {
      openMessage({
        mode: 'success',
        title: 'Success',
        message: 'Success Edit Application Theme',
      });
    },
    onError: () => {
      openMessage({
        mode: 'danger',
        title: 'Error',
        message: 'Error Edit Application Theme',
      });
    },
  });
  return {
    addApplicationTheme,
    isSuccessAddApplicationTheme,
    isErrorAddApplicationTheme,
    isPendingAddApplicationTheme,
    editApplicationTheme,
    isSuccessEditApplicationTheme,
    isErrorEditApplicationTheme,
    isPendingEditApplicationTheme,
  };
}
