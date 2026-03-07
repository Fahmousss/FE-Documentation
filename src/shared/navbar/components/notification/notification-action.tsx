import { useNotificationContext } from '@/pages/notification/hooks/use-notification-context';

const NotificationAction = () => {
  const { dataNotification } = useNotificationContext();
  const unread = dataNotification.filter((item) => !item.is_read).length;
  return (
    <div className="bg-grey-50 flex items-center justify-between py-2 px-3 rounded-sm">
      <p className="text-neutral-900">All Unread ({unread})</p>
      <div className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="19"
          viewBox="0 0 18 19"
          fill="none"
        >
          <path
            d="M13.5 5L5.25 13.25L1.5 9.5M16.5 8L10.875 13.625L9.75 12.5"
            stroke="#00B85A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="text-green-500">Mark all as read</p>
      </div>
    </div>
  );
};

export default NotificationAction;
