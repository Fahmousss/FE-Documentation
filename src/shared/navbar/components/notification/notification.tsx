import useNotification from '@/pages/notification/hooks/use-notification';
import { NotificationContext } from '@/pages/notification/hooks/use-notification-context';
import NotificationContent from './notication-content';
import NotificationAction from './notification-action';
import NotificationHeader from './notification-header';

const Notification = () => {
  const { dataNotification, groupedDataNotification } = useNotification();
  const refetchNotification = () => {};
  return (
    <NotificationContext.Provider
      value={{ dataNotification, groupedDataNotification, refetchNotification }}
    >
      <div className="flex flex-col gap-1 w-[340px] max-h-[300px]">
        <NotificationHeader />
        <NotificationAction />
        <NotificationContent />
      </div>
    </NotificationContext.Provider>
  );
};

export default Notification;
