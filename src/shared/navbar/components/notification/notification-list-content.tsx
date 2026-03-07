import BellNotification from '@/assets/icons/bell-notification.svg';
import { INotification } from '@/pages/notification/utils/model';
import dayjs from 'dayjs';

export interface NotificationListContentProps {
  item: INotification;
}

const NotificationListContent = ({ item }: NotificationListContentProps) => {
  return (
    <div className="w-full flex items-center justify-between hover:cursor-pointer">
      <div className="flex items-center gap-2 w-5/6">
        <div className="size-8">
          <img src={BellNotification} alt="bell-notification" className="object-cover" />
        </div>
        <div className="flex flex-col w-5/6">
          <p className="text-base text-grey-500 font-bold truncate">{item.title}</p>
          <p className="text-grey-300 truncate">{item.description}</p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-grey-300">{dayjs(item.created_at).format('HH:mm')}</p>
        {item.is_read ? null : <div className="size-3 rounded-full bg-yellow-500" />}
      </div>
    </div>
  );
};

export default NotificationListContent;
