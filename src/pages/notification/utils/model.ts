export interface INotification {
  id: string;
  title: string;
  description: string;
  is_read: boolean;
  created_at: string;
}

export type GroupedNotification = {
  date: string;
  data: INotification[];
};
