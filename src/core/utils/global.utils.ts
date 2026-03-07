import { Pagination } from '@/core/models/http.types';
import { AxiosResponse } from 'axios';
import {
  LIST_SIDEBAR_MASTER_DATA,
  LIST_SIDEBAR_REPORT,
  LIST_SIDEBAR_USER_MANAGEMENT,
} from '../constant/sidebar.constant';

export function createUrlWithQueryParams(
  path: string,
  queryParams: {
    [key: string]: string | number | null | undefined | boolean | string[];
  },
): string {
  const urlParams = new URLSearchParams();

  Object.entries(queryParams).map(([k, v]) => {
    if (v !== undefined && v !== null) {
      urlParams.append(k, v.toString());
    }
  });

  return `${path}?${urlParams.toString()}`;
}

export function getPaginationHeaders(response?: AxiosResponse) {
  if (response?.headers['x-pagination']) {
    return JSON.parse(response.headers['x-pagination']) as Pagination;
  }
  return {} as Pagination;
}

export function insertFormData(object: Record<string, never>) {
  const formData = new FormData();
  Object.keys(object).forEach((key) => {
    if (object[key]) {
      formData.append(key, object[key]);
    }
  });
  return formData;
}

export const selectFilterOption = (
  input: string,
  option?: { label: string; value: string },
): boolean => {
  return (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
};

export const checkIncludes = <T>(arr: T[], referenceArr: T[]): boolean => {
  for (let i = 0; i < referenceArr.length; i++) {
    if (!arr.includes(referenceArr[i])) return false;
  }
  return true;
};

export const isCurrentPageInSidebar = (pathname: string): boolean => {
  const allPaths = [
    ...LIST_SIDEBAR_REPORT.flatMap((item) => [
      item.path,
      ...(item.child ? item.child.map((child) => child.path) : []),
    ]),
    ...LIST_SIDEBAR_MASTER_DATA.flatMap((item) => [
      item.path,
      ...(item.child ? item.child.map((child) => child.path) : []),
    ]),
    ...LIST_SIDEBAR_USER_MANAGEMENT.flatMap((item) => [
      item.path,
      ...(item.child ? item.child.map((child) => child.path) : []),
    ]),
  ];
  return allPaths.includes(pathname);
};

export function deepMerge<T>(target: T, source: Partial<T>): T {
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      // @ts-ignore
      target[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      // @ts-ignore
      target[key] = source[key];
    }
  }
  return target;
}
