import { FAKE_NOTIFICATIONS } from '../utils/constant';
import { groupByDate } from '../utils/form';

export default function useNotification() {
  return {
    dataNotification: FAKE_NOTIFICATIONS,
    groupedDataNotification: groupByDate(FAKE_NOTIFICATIONS),
  };
}
