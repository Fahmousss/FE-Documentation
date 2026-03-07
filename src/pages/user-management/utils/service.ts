import { IUserRole } from '@/core/hooks/use-user-role';
import { HTTPResponse } from '@/core/models/http.types';
import axios from '@/core/utils/axios.utils';

export const userManagementService = {
  //   getAllMenus: async (): Promise<HTTPResponse<IMenu[]>> => {
  //     const response = await axios.get<HTTPResponse<IMenu[]>>(
  //       "/permission/get-all-permission"
  //     );
  //     return response?.data;
  //   },

  getAllRole: async (): Promise<HTTPResponse<IUserRole[]>> => {
    const response = await axios.get<HTTPResponse<IUserRole[]>>('/role/get-all-role');
    return response?.data;
  },
};
