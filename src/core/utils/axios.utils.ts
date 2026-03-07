import axiosInstance, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN, BASE_URL } from '../constant/config.constant';

const axios: AxiosInstance = axiosInstance.create({
  baseURL: BASE_URL,
  maxBodyLength: Infinity,
  maxContentLength: Infinity,
});

axios.interceptors.request.use(
  (request) => {
    const access_token = Cookies.get(ACCESS_TOKEN);

    request.headers.Authorization = `Bearer ${access_token}`;

    return request;
  },
  (error) => {
    Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axiosInstance.isAxiosError(error)) {
      if (error.response?.status === 401) {
        Cookies.remove(ACCESS_TOKEN);
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

export default axios;
