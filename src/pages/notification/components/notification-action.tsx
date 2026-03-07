import { useNotificationContext } from '../hooks/use-notification-context';

const NotificationAction = () => {
  const { dataNotification } = useNotificationContext();
  const unread = dataNotification.filter((item) => !item.is_read).length;
  return (
    <div className="w-full py-1 px-3 flex items-center justify-between bg-grey-50 rounded">
      <p className="text-sm text-neutral-900">All Unread ({unread})</p>
      <div className="flex gap-1">
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
        <p className="text-sm text-green-500">Mark All as Read</p>
      </div>
    </div>
  );
};

export default NotificationAction;
