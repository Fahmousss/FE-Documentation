import dayjs from 'dayjs';
import { GroupedNotification, INotification } from './model';

// import utc from "dayjs/plugin/utc";

// dayjs.extend(utc);

export const groupByDate = (notifications: INotification[]): GroupedNotification[] => {
  const groupedData: GroupedNotification[] = Object.entries(
    notifications.reduce(
      (acc, notification) => {
        const { created_at } = notification;
        const date = dayjs(created_at).startOf('day').format('YYYY-MM-DD');
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(notification);
        return acc;
      },
      {} as Record<string, INotification[]>,
    ),
  )
    .map(([date, data]) => ({
      date,
      data: data.sort((a, b) => dayjs(b.created_at).diff(dayjs(a.created_at))),
    }))
    .sort((a, b) => dayjs(b.date).diff(dayjs(a.date)));

  return groupedData;
};
