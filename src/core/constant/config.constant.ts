export const DEV = import.meta.env.DEV;
export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const SIGNALR_URL = import.meta.env.VITE_SIGNALR;
export const CDN_URL = import.meta.env.VITE_CDN_URL;

export const ACCESS_TOKEN = 'accessToken';
export const USER_ID = 'userId';
export const USERNAME = 'username';


export const DEFAULT_EXPIRES_TOKEN = 365; // 365 days
export const DEFAULT_DEBOUNCE_DELAY = 300;
export const DEFAULT_PAGE_INDEX = 1;
export const DEFAULT_PAGE_LIMIT = 10;

export const limitList = [3, 5, 10, 20, 30, 40, 50];

export const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
