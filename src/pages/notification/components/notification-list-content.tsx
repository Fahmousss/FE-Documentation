import BellNotification from '@/assets/icons/bell-notification.svg';
import { cn } from '@/core/utils/class.utils';
import { Checkbox } from 'antd';
import dayjs from 'dayjs';
import { INotification } from '../utils/model';

export interface NotificationListContentProps {
  data: INotification;
}

const NotificationListContent = ({ data }: NotificationListContentProps) => {
  const clickHandler = () => {
    if (data.is_read) return;
    console.log('read: ', data.id);
  };
  return (
    <div
      onClick={clickHandler}
      className={cn(
        'w-full py-1 px-3 flex justify-between items-center rounded-md',
        data.is_read
          ? 'opacity-50 hover:cursor-default'
          : 'hover:bg-grey-50 hover:cursor-pointer',
      )}
    >
      <div className="flex items-center gap-2">
        <Checkbox onClick={clickHandler} checked={data.is_read} disabled={data.is_read} />
        <div className="size-8">
          <img src={BellNotification} alt="bell-notification" className="object-cover" />
        </div>
        <div className="flex flex-col">
          <p
            className={cn(
              'text-md font-bold text-grey-500',
              data.is_read && 'line-through text-grey-300',
            )}
          >
            {data.title}
          </p>
          <p className="text-[10px] text-grey-300">{data.description}</p>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center">
        <p className="text-sm text-dark-50">{dayjs(data.created_at).format('HH:mm')}</p>
        {!data.is_read ? <div className="size-3 bg-yellow-500 rounded-full" /> : null}
      </div>
    </div>
  );
};

export default NotificationListContent;
