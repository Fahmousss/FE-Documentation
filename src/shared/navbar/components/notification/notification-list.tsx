import { GroupedNotification } from '@/pages/notification/utils/model';
import dayjs from 'dayjs';
import NotificationListContent from './notification-list-content';

interface NotificationListProps {
  item: GroupedNotification;
}

const NotificationList = ({ item }: NotificationListProps) => {
  const diff = dayjs().diff(dayjs(item.date), 'days');
  const header =
    diff === 0 ? 'Today' : diff === 1 ? 'Yesterday' : dayjs(item.date).format('DD/MM/YYYY');
  return (
    <div className="flex flex-col">
      <p className="text-grey-500 py-1 px-3 border-b border-b-grey-100">{header}</p>
      <div className="flex flex-col py-[8px] gap-y-2">
        {item.data.map((item, index) => (
          <NotificationListContent key={`notification-list-content-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
};

export default NotificationList;
