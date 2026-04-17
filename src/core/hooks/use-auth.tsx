import Cookies from 'js-cookie';
import { CookieAttributes } from 'node_modules/@types/js-cookie';
import {
  ACCESS_TOKEN,
  DEFAULT_EXPIRES_TOKEN,
  USER_ID,
  USERNAME,
} from '../constant/config.constant';
import { HTTPResponse } from '../models/http.types';
import axiosGuest from '../utils/axios-guest.utils';
import axios from '../utils/axios.utils';
import { useMessageContext } from './use-message-context';

export interface User {
  id: string | number;
  name: string;
  email: string;
}

type LoginHttpResponse = {
  token: string;
  user: User;
};

export interface Login {
  email: string;
  password: string;
}

export default function useAuth() {
  const { openMessage } = useMessageContext();

  async function login(credential: Login): Promise<void> {
    try {
      const {
        data: { data },
      } = await axiosGuest.post<HTTPResponse<LoginHttpResponse>>('/login', {
        ...credential,
      });

      // Get data from Response (Sanctum)
      const { token, user } = data;

      // Options cookie
      const cookieOptions: CookieAttributes = {
        path: '/',
        expires: DEFAULT_EXPIRES_TOKEN,
        secure: false,
      };

      // Update tokens di cookie
      Cookies.set(ACCESS_TOKEN, token, cookieOptions);
      Cookies.set(USERNAME, user.name, cookieOptions);
      Cookies.set(USER_ID, String(user.id), cookieOptions);

      openMessage({
        title: 'Login Success',
        message: 'You have been successfully logged in',
        mode: 'success',
      });
    } catch (e) {
      openMessage({
        title: 'Failed to login',
        message: 'Invalid email or password',
        mode: 'danger',
      });
      throw e;
    }
  }

  async function logout(): Promise<void> {
    try {
      await axios.post('/logout');
    } catch (e) {
      console.error('Logout error:', e);
    } finally {
      // Always clear cookies and redirect regardless of API success
      Cookies.remove(ACCESS_TOKEN);
      Cookies.remove(USERNAME);
      Cookies.remove(USER_ID);
      window.location.href = '/login';
    }
  }

  return {
    login,
    logout,
  };
}
