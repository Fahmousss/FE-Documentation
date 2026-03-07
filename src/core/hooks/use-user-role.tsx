import { userManagementService } from '@/pages/user-management/utils/service';
import { useQuery } from '@tanstack/react-query';

export interface IUserRole {
  id: string;
  role: string;
}

export default function useUserRole() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['/role/get-all-role'],
    queryFn: () => {
      return userManagementService.getAllRole();
    },
  });

  return {
    dataUserRole: data?.data,
    isLoadingUserRole: isLoading,
    isErrorUserRole: isError,
    refetchUserRole: refetch,
  };
}
