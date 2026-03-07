export const FILTER_DATE_TYPE: { label: string; value: FilterDateValue }[] = [
  {
    value: 'default',
    label: 'Default',
  },
  {
    value: 'day',
    label: 'Daily',
  },
  {
    value: 'week',
    label: 'Weekly',
  },
  {
    value: 'month',
    label: 'Monthly',
  },
  {
    value: 'year',
    label: 'Yearly',
  },
];
export type FilterDateValue = 'default' | 'day' | 'week' | 'month' | 'year';
