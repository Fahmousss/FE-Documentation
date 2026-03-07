import { ISection } from '@/shared/sidebar/utils/models';
import {
  LIST_SIDEBAR,
  LIST_SIDEBAR_MAINTENANCE,
  LIST_SIDEBAR_MASTER_DATA,
  LIST_SIDEBAR_USER_MANAGEMENT,
} from './sidebar.constant';

export const LIST_SECTION: ISection[] = [
  {
    name: 'application',
  },
  // {
  //   name: 'maintenance',
  // },
  // {
  //   name: 'management',
  // },
  // {
  //   name: 'database',
  // },
];

export const LIST_SECTION_RENDER = [
  {
    name: 'application',
    list: LIST_SIDEBAR,
  },
  {
    name: 'management',
    list: LIST_SIDEBAR_USER_MANAGEMENT,
  },
  {
    name: 'database',
    list: LIST_SIDEBAR_MASTER_DATA,
  },
  {
    name: 'maintenance',
    list: LIST_SIDEBAR_MAINTENANCE,
  },
];
