import IconFormula from '@/shared/icon/formula';
import IconDashboard from '@/shared/icon/sidebar/dashboard';
import IconMaintenance from '@/shared/icon/sidebar/maintenance';
import IconMasterData from '@/shared/icon/sidebar/master-data';
import IconRole from '@/shared/icon/sidebar/role';
import IconSetting from '@/shared/icon/sidebar/setting';
import IconSummary from '@/shared/icon/sidebar/summary';
import IconUser from '@/shared/icon/sidebar/user';
import { ISidebar } from '@/shared/sidebar/utils/models';


export const LIST_SIDEBAR: ISidebar[] = [
  {
    name: 'Product',
    Image: IconDashboard,
    path: '/product',
  },
  {
    name: 'Documentation',
    Image: IconSummary,
    path: '/documentation',
  },

];

export const LIST_SIDEBAR_USER_MANAGEMENT: ISidebar[] = [
  //   {
  //     name: 'User Management',
  //     Image: IconUser,
  //     path: '/user-management',
  //   },
  //   {
  //     name: 'Role',
  //     Image: IconRole,
  //     path: '/role',
  //   },
  //   {
  //     name: 'Setting',
  //     Image: IconSetting,
  //     path: '/setting',
  //   },
];

export const LIST_SIDEBAR_MAINTENANCE: ISidebar[] = [
  //   {
  //     name: 'Maintenance Schedule',
  //     Image: IconMaintenance,
  //     path: '/maintenance-schedule',
  //   },
  //   {
  //     name: 'Maintenance Preventive',
  //     Image: IconMaintenance,
  //     path: '/maintenance-preventive',
  //   },
  //   {
  //     name: 'Alarm',
  //     Image: IconMaintenance,
  //     path: '/alarm',
  //   },
];

export const LIST_SIDEBAR_MASTER_DATA: ISidebar[] = [
  //   {
  //     name: 'Dynamic Data',
  //     Image: IconMasterData,
  //     path: '/master-data/dynamic-data',
  //   },
  //   {
  //     name: 'Master Data',
  //     Image: IconMasterData,
  //     child: [
  //       {
  //         name: 'Line',
  //         path: '/master-data/line',
  //       },
  //       {
  //         name: 'Machine',
  //         path: '/master-data/machine',
  //       },
  //       {
  //         name: 'Parameter',
  //         path: '/master-data/parameter',
  //       },
  //     ],
  //   },
];

export const LIST_SIDEBAR_REPORT: ISidebar[] = [
  //   {
  //     name: 'Report Data',
  //     Image: IconFormula,
  //     path: '/report-data',
  //   },
];