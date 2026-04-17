import { USER_ID } from '@/core/constant/config.constant';
import { useMessageContext } from '@/core/hooks/use-message-context';
import axios from '@/core/utils/axios.utils';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { IBodySection } from '../utils/models';

export interface IFormSection extends IBodySection {}

export default function useSectionMutation() {
  const user_id = Cookies.get(USER_ID);

  const { openMessage } = useMessageContext();

  const {
    mutateAsync: addSection,
    isPending: isPendingAddSection,
    isError: isErrorAddSection,
    isSuccess: isSuccessAddSection,
  } = useMutation({
    mutationFn: (body: IBodySection) => {
      return axios.post(`/section`, {
        user_id: user_id,
        ...body,
      });
    },
    onError: () =>
      openMessage({
        message: 'Error Add Section',
        mode: 'danger',
        title: 'Error',
      }),
    onSuccess: () =>
      openMessage({
        message: 'Success Add Section',
        mode: 'success',
        title: 'Success',
      }),
  });

  const {
    mutateAsync: editSection,
    isPending: isPendingEditSection,
    isError: isErrorEditSection,
    isSuccess: isSuccessEditSection,
  } = useMutation({
    mutationFn: (body: IBodySection) => {
      return axios.put(`/section/${body.id}`, {
        user_id: user_id,
        ...body,
      });
    },
    onError: () =>
      openMessage({
        message: 'Error Edit Section',
        mode: 'danger',
        title: 'Error',
      }),
    onSuccess: () =>
      openMessage({
        message: 'Success Edit Section',
        mode: 'success',
        title: 'Success',
      }),
  });

  const {
    mutateAsync: deleteSection,
    isPending: isPendingDeleteSection,
    isError: isErrorDeleteSection,
    isSuccess: isSuccessDeleteSection,
  } = useMutation({
    mutationFn: (id: string) => {
      return axios.delete(`/section/${id}`);
    },
    onError: () =>
      openMessage({
        message: 'Error Delete Section',
        mode: 'danger',
        title: 'Error',
      }),
    onSuccess: () =>
      openMessage({
        message: 'Success Delete Section',
        mode: 'success',
        title: 'Success',
      }),
  });

  return {
    addSection,
    isPendingAddSection,
    isErrorAddSection,
    isSuccessAddSection,
    editSection,
    isPendingEditSection,
    isErrorEditSection,
    isSuccessEditSection,
    deleteSection,
    isPendingDeleteSection,
    isErrorDeleteSection,
    isSuccessDeleteSection,
  };
}
