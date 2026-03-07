import Cookies from 'js-cookie'; 
import { jwtDecode } from 'jwt-decode';
import {
  ACCESS_TOKEN,
  DEFAULT_EXPIRES_TOKEN,
  REFRESH_TOKEN,
  ROLE,
  USERNAME,
} from '../constant/config.constant';
import { HTTPResponse } from '../models/http.types';
import axiosGuest from '../utils/axios-guest.utils';
import { useMessageContext } from './use-message-context';
import { CookieAttributes } from 'node_modules/@types/js-cookie';

export interface User {
  username?: string;
  role?: string;
}

type LoginHttpResponse = {
  accessToken: string;
  refreshToken: string;
};

export interface IDecodedToken {
  username: string;
  role_name: string;
  exp: number;
}

export interface Login {
  username: string;
  password: string;
}

export default function useAuth() {
  const { openMessage } = useMessageContext();

  async function login(credential: { username: string; password: string }): Promise<void> {
    try {
      const {
        data: { data },
      } = await axiosGuest.post<HTTPResponse<LoginHttpResponse>>('/authentication', {
        ...credential,
      });

      // Get data from Response
      const { accessToken, refreshToken } = data;

      // Options cookie
      const decodedToken = jwtDecode(accessToken);
      const { username, role_name } = decodedToken as IDecodedToken;

      // Update tokens di cookie
      const cookieOptions: CookieAttributes = {
        path: '/',
        expires: DEFAULT_EXPIRES_TOKEN,
        secure: false,
      };
      Cookies.set(ACCESS_TOKEN, accessToken, cookieOptions);
      Cookies.set(REFRESH_TOKEN, refreshToken, cookieOptions);
      Cookies.set(USERNAME, username, cookieOptions);
      Cookies.set(ROLE, role_name, cookieOptions);
      openMessage({
        title: 'Login Success',
        message: 'You have been successfully logged in',
        mode: 'success',
      });
    } catch (e) {
      openMessage({
        title: 'Failed to login',
        message: 'Invalid username or password',
        mode: 'danger',
      });
      throw e;
    }
  }

  return {
    login,
  };
}
