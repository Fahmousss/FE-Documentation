import { useNotificationContext } from '../hooks/use-notification-context';
import NotificationList from './notification-list';

const NotificationContent = () => {
  const { groupedDataNotification } = useNotificationContext();
  return (
    <div className="w-full flex flex-col gap-3">
      {/* Card List */}
      {groupedDataNotification.map((item, index) => (
        <NotificationList key={`notification-list-${index}`} item={item} />
      ))}
    </div>
  );
};

export default NotificationContent;
