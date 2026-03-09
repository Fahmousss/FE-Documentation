import { useMessageContext } from '@/core/hooks/use-message-context';
import { HTTPResponse } from '@/core/models/http.types';
import axios from '@/core/utils/axios.utils';
import { useMutation } from '@tanstack/react-query';
import { IPreferencesRequest } from '../utils/model';

export default function usePreferencesMutation() {
  const { openMessage } = useMessageContext();

  // Preferences hanya menggunakan PUT (upsert) sesuai endpoint
  const { mutateAsync: updatePreferences, isPending: isPendingUpdatePreferences } = useMutation({
    mutationFn: ({ body, productId }: { body: IPreferencesRequest; productId: string }) => {
      return axios.put<HTTPResponse<string>>(`/products/${productId}/preferences`, body);
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

  const { mutateAsync: deletePreferences, isPending: isPendingDeletePreferences } = useMutation({
    mutationFn: (productId: string) => {
      return axios.delete<HTTPResponse<string>>(`/products/${productId}/preferences`);
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
    updatePreferences,
    isPendingUpdatePreferences,
    deletePreferences,
    isPendingDeletePreferences,
  };
}