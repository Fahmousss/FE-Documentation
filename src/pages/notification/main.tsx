import CardEID from '@/shared/card';
import Label from '@/shared/header/label';
import NotificationAction from './components/notification-action';
import NotificationContent from './components/notification-content';
import useNotification from './hooks/use-notification';
import { NotificationContext } from './hooks/use-notification-context';

const Notification = () => {
  const { dataNotification, groupedDataNotification } = useNotification();
  return (
    <NotificationContext.Provider
      value={{
        dataNotification,
        groupedDataNotification,
        refetchNotification: () => {},
      }}
    >
      {/* Breadcrumb */}
      {/* <BreadcrumbNewEID /> */}
      {/* <BreadCrumbEID
        className="relative mb-2.5"
        items={[
          {
            label: 'Notifications',
            path: '#',
          },
        ]}
      /> */}
      {/* Main Container */}
      <CardEID>
        {/* Header */}
        <Label title="Notification" subTitle="Stay updated with your latest notification" />
        {/* Main action */}
        <NotificationAction />
        {/* Main Content */}
        <NotificationContent />
      </CardEID>
    </NotificationContext.Provider>
  );
};

export default Notification;
