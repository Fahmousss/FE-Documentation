import IconCalendar from '@/shared/icon/calendar';
import IconChart from '@/shared/icon/chart';
import IconDelete from '@/shared/icon/delete';
import IconEdit from '@/shared/icon/edit';
import IconEyeHide from '@/shared/icon/eye-hide';
import IconEyeShow from '@/shared/icon/eye-show';
import IconMasterData from '@/shared/icon/master-data';
import IconNotification from '@/shared/icon/notification';
import IconProfile from '@/shared/icon/profile';
import IconReport from '@/shared/icon/report';
import IconView from '@/shared/icon/view';

export default function TestingPage() {
  return (
    <div>
      <IconEyeShow />
      <IconEyeHide />
      <IconCalendar />
      <IconEdit />
      <IconDelete />
      <IconView />
      <IconReport />
      <IconNotification />
      <IconProfile />
      <IconMasterData />
      <IconChart />
    </div>
  );
}
