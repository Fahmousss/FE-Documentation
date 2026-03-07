import useJwt from '@/core/hooks/use-jwt';
import { useMessageContext } from '@/core/hooks/use-message-context';
import axios from '@/core/utils/axios.utils';
import { useMutation } from '@tanstack/react-query';
import { IEditSidebarChildBody, ISidebarBody, ISidebarServerBody } from '../utils/models';

export default function useSidebarMutation() {
  const { openMessage } = useMessageContext();
  const { user_id } = useJwt();

  const {
    mutateAsync: addSidebar,
    isSuccess: isSuccessAddSidebar,
    isError: isErrorAddSidebar,
    isPending: isPendingAddSidebar,
  } = useMutation({
    mutationFn: (body: ISidebarBody) =>
      axios.post('/sidebar', {
        user_id,
        ...body,
      }),
    onSuccess: () => {
      openMessage({
        mode: 'success',
        title: 'Success',
        message: 'Success Add Sidebar',
      });
    },
    onError: () => {
      openMessage({
        mode: 'danger',
        title: 'Error',
        message: 'Error Add Sidebar',
      });
    },
  });

  const {
    mutateAsync: deleteSidebar,
    isSuccess: isSuccessDeleteSidebar,
    isError: isErrorDeleteSidebar,
    isPending: isPendingDeleteSidebar,
  } = useMutation({
    mutationFn: (id: string) => axios.delete(`/sidebar/${id}`),
    onSuccess: () => {
      openMessage({
        mode: 'success',
        title: 'Success',
        message: 'Success Delete Sidebar',
      });
    },
    onError: () => {
      openMessage({
        mode: 'danger',
        title: 'Error',
        message: 'Error Delete Sidebar',
      });
    },
  });

  const {
    mutateAsync: editSidebar,
    isSuccess: isSuccessEditSidebar,
    isError: isErrorEditSidebar,
    isPending: isPendingEditSidebar,
  } = useMutation({
    mutationFn: ({ id, body }: { id: string; body: ISidebarServerBody }) =>
      axios.put(`/sidebar/${id}`, {
        user_id,
        ...body,
      }),
    onSuccess: () => {
      openMessage({
        mode: 'success',
        title: 'Success',
        message: 'Success Edit Sidebar',
      });
    },
    onError: () => {
      openMessage({
        mode: 'danger',
        title: 'Error',
        message: 'Error Edit Sidebar',
      });
    },
  });

  const {
    mutateAsync: editChildSidebar,
    isSuccess: isSuccessEditChildSidebar,
    isError: isErrorEditChildSidebar,
    isPending: isPendingEditChildSidebar,
  } = useMutation({
    mutationFn: (body: IEditSidebarChildBody) =>
      axios.put(`/sidebar/sidebar-child`, {
        user_id,
        ...body,
      }),
    onSuccess: () => {
      openMessage({
        mode: 'success',
        title: 'Success',
        message: 'Success Edit Sidebar',
      });
    },
    onError: () => {
      openMessage({
        mode: 'danger',
        title: 'Error',
        message: 'Error Edit Sidebar',
      });
    },
  });

  return {
    addSidebar,
    isSuccessAddSidebar,
    isErrorAddSidebar,
    isPendingAddSidebar,
    deleteSidebar,
    isSuccessDeleteSidebar,
    isErrorDeleteSidebar,
    isPendingDeleteSidebar,
    editSidebar,
    isSuccessEditSidebar,
    isErrorEditSidebar,
    isPendingEditSidebar,
    editChildSidebar,
    isSuccessEditChildSidebar,
    isErrorEditChildSidebar,
    isPendingEditChildSidebar,
  };
}
