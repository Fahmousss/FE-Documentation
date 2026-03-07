import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { ACCESS_TOKEN } from '../constant/config.constant';

export interface JwtPayload {
  user_id: string;
  username: string;
  Permission: string;
}

export default function useJwt() {
  const token = Cookies.get(ACCESS_TOKEN);

  if (!token)
    return {
      user_id: '',
      username: '',
      role_name: '',
    };
  return jwtDecode(token!) as JwtPayload;
}
