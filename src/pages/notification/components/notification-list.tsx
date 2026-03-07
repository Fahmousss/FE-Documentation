import dayjs from 'dayjs';
import { GroupedNotification } from '../utils/model';
import NotificationListContent from './notification-list-content';

interface NotificationListProps {
  item: GroupedNotification;
}

const NotificationList = ({ item }: NotificationListProps) => {
  const diff = dayjs().diff(dayjs(item.date), 'days');
  const header =
    diff === 0 ? 'Today' : diff === 1 ? 'Yesterday' : dayjs(item.date).format('DD/MM/YYYY');
  return (
    <div className="w-full flex flex-col gap-3">
      {/* Header Card */}
      <p className="w-full text-sm py-1 px-3 border-b border-b-blue-100">{header}</p>
      {/* List Content */}
      <div className="w-full flex flex-col gap-3">
        {/* Content */}
        {item.data.map((item, index) => (
          <NotificationListContent key={`notification-list-content-${index}`} data={item} />
        ))}
      </div>
    </div>
  );
};

export default NotificationList;
