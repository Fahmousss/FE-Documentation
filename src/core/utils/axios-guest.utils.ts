import axios, { AxiosInstance } from 'axios';
import { BASE_URL } from '../constant/config.constant';

const axiosGuest: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

export default axiosGuest;
