import { scientificFormatter } from '@/core/utils/formatter.utils';

export const scientificFormatterCallback = (value: number | string) => {
  if (typeof value === 'string') return value;
  return scientificFormatter(Number(value));
};
