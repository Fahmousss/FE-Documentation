import { createContext, useContext } from 'react';
import { GroupedNotification, INotification } from '../utils/model';

export interface NotificationContext {
  dataNotification: INotification[];
  groupedDataNotification: GroupedNotification[];
  refetchNotification: () => void;
}

export const NotificationContext = createContext<NotificationContext | null>(null);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('Section Context must be used within a Section Provider');
  }
  return context;
};
