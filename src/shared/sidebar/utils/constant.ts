import IconMasterData from '@/shared/icon/master-data';
import IconAccount from '@/shared/icon/sidebar/account';
import IconActivityUser from '@/shared/icon/sidebar/activity-user';
import IconDashboard from '@/shared/icon/sidebar/dashboard';
import IconDetail from '@/shared/icon/sidebar/detail';
import IconMaintenance from '@/shared/icon/sidebar/maintenance';
import IconPermission from '@/shared/icon/sidebar/permissions';
import IconRegister from '@/shared/icon/sidebar/register';
import IconRole from '@/shared/icon/sidebar/role';
import IconSetting from '@/shared/icon/sidebar/setting';
import IconSingleLine from '@/shared/icon/sidebar/single-line';
import { ISidebar } from '@/shared/sidebar/utils/models';

export const sidebarIcon: { [key: string]: ISidebar['Image'] } = {
  Dashboard: IconDashboard,
  Account: IconAccount,
  'Activity User': IconActivityUser,
  Detail: IconDetail,
  Maintenance: IconMaintenance,
  'Master Data': IconMasterData,
  Permission: IconPermission,
  Register: IconRegister,
  Role: IconRole,
  Setting: IconSetting,
  'Single Line': IconSingleLine,
};

export const SidebarTypeOptions = [
  {
    label: 'Component',
    value: 'component',
  },
  {
    label: 'Map',
    value: 'map',
  },
  {
    label: 'Summary',
    value: 'summary',
  },
];
