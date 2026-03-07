import { useMessageContext } from '@/core/hooks/use-message-context';
import axios from '@/core/utils/axios.utils';
import { useMutation } from '@tanstack/react-query';
import { IBodyUser } from '../utils/model';

export const useMutationUserManagement = () => {
  const { openMessage } = useMessageContext();

  const {
    mutateAsync: addUser,
    isPending: isPendingAddUser,
    isError: isErrorAddUser,
    isSuccess: isSuccessAddUser,
  } = useMutation({
    mutationFn: (body: IBodyUser) => {
      return axios.post('/users', body);
    },
    onSuccess: () => {
      openMessage({
        message: 'Success Add User',
        mode: 'success',
        title: 'Success',
      });
    },
    onError: () => {
      openMessage({
        message: 'Error Add User',
        mode: 'danger',
        title: 'Error',
      });
    },
  });

  // Edit User
  const {
    mutateAsync: editUser,
    isPending: isPendingEditUser,
    isError: isErrorEditUser,
    isSuccess: isSuccessEditUser,
  } = useMutation({
    mutationFn: (body: IBodyUser) => {
      return axios.put(`/users/${body.id}?id=${body.id}`, body);
    },
    onSuccess: () => {
      openMessage({
        message: 'Success Edit User',
        mode: 'success',
        title: 'Success',
      });
    },
    onError: () => {
      openMessage({
        message: 'Error Edit User',
        mode: 'danger',
        title: 'Error',
      });
    },
  });

  const {
    mutateAsync: forgotPassword,
    isPending: isPendingForgotPassword,
    isError: isErrorForgotPassword,
    isSuccess: isSuccessForgotPassword,
    data: dataForgotPassword,
  } = useMutation({
    mutationFn: async ({ user_name }: { user_name: string }) => {
      try {
        const response = await axios.put('/account/forgot-password', {
          user_name,
        });
        return response.data;
      } catch (error) {
        throw new Error('Error during forgot password' + error.message);
      }
    },
    onSuccess: () => {
      openMessage({
        message: 'Success Reset Password',
        mode: 'success',
        title: 'Success',
      });
    },
    onError: () => {
      openMessage({
        message: 'Error Reset Password',
        mode: 'danger',
        title: 'Error',
      });
    },
  });

  const {
    mutateAsync: deleteUserManagement,
    isPending: isPendingDeleteUserManagement,
    isError: isErrorDeleteUserManagement,
    isSuccess: isSuccessDeleteUserManagement,
  } = useMutation({
    mutationFn: (body: string[]) => {
      return axios.delete(`/users`, {
        data: {
          id: body,
        },
      });
    },
    onSuccess: () => {
      openMessage({
        message: 'Success Delete data',
        mode: 'success',
        title: 'Success',
      });
    },
    onError: () => {
      openMessage({
        message: 'Error Delete data',
        mode: 'danger',
        title: 'Error',
      });
    },
  });

  return {
    addUser,
    isPendingAddUser,
    isErrorAddUser,
    isSuccessAddUser,
    editUser,
    isPendingEditUser,
    isErrorEditUser,
    isSuccessEditUser,
    forgotPassword,
    isPendingForgotPassword,
    isErrorForgotPassword,
    isSuccessForgotPassword,
    dataForgotPassword,
    deleteUserManagement,
    isPendingDeleteUserManagement,
    isErrorDeleteUserManagement,
    isSuccessDeleteUserManagement,
  };
};
