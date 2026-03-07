import { useNotificationContext } from '@/pages/notification/hooks/use-notification-context';
import NotificationList from './notification-list';

const NotificationContent = () => {
  const { groupedDataNotification } = useNotificationContext();
  return (
    <div className="flex flex-col overflow-auto">
      {groupedDataNotification.map((item, index) => (
        <NotificationList key={`notification-list-${index}`} item={item} />
      ))}
    </div>
  );
};

export default NotificationContent;
