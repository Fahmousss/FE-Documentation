import dayjs from 'dayjs';

export const presetsRange: {
  label: string;
  value: [dayjs.Dayjs, dayjs.Dayjs];
}[] = [
  { label: 'Today', value: [dayjs().startOf('day'), dayjs().endOf('day')] },
  { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
  { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
  { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
  { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
  { label: 'Last 6 Months', value: [dayjs().add(-6, 'M'), dayjs()] },
  { label: 'Last Year', value: [dayjs().add(-1, 'y'), dayjs()] },
];
