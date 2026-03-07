import { IRole } from './model';

export const dataSourceRole: IRole[] = [
  {
    id: '1',
    name: 'Super Admin',
    permissions: [
      {
        id: '',
        page: 'Dashboard',
        permission: ['View', 'Create', 'Edit', 'Delete'],
      },
      {
        id: '',
        page: 'Summary',
        permission: ['View', 'Create', 'Edit', 'Delete'],
      },
      {
        id: '',
        page: 'User Management',
        permission: ['View', 'Create', 'Edit', 'Delete'],
      },
      {
        id: '',
        page: 'Role',
        permission: ['View', 'Create', 'Edit', 'Delete'],
      },
      {
        id: '',
        page: 'Setting',
        permission: ['View', 'Create', 'Edit', 'Delete'],
      },
      {
        id: '',
        page: 'Dynamic Data',
        permission: ['View', 'Create', 'Edit', 'Delete'],
      },
      {
        id: '',
        page: 'Master Data Line',
        permission: ['View', 'Create', 'Edit', 'Delete'],
      },
      {
        id: '',
        page: 'Master Data Machine',
        permission: ['View', 'Create', 'Edit', 'Delete'],
      },
      {
        id: '',
        page: 'Master Data Parameter',
        permission: ['View', 'Create', 'Edit', 'Delete'],
      },
    ],
    created_at: '06:15',
    updated_at: '06:15',
  },
  {
    id: '2',
    name: 'Staff',
    permissions: [
      {
        id: '',
        page: 'Dashboard',
        permission: ['View'],
      },
      {
        id: '',
        page: 'Summary',
        permission: ['View'],
      },
      {
        id: '',
        page: 'Dynamic Data',
        permission: ['View', 'Create', 'Edit', 'Delete'],
      },
      {
        id: '',
        page: 'Master Data Line',
        permission: ['View', 'Create', 'Edit', 'Delete'],
      },
      {
        id: '',
        page: 'Master Data Machine',
        permission: ['View', 'Create', 'Edit', 'Delete'],
      },
      {
        id: '',
        page: 'Master Data Parameter',
        permission: ['View', 'Create', 'Edit', 'Delete'],
      },
    ],
    created_at: '06:15',
    updated_at: '06:15',
  },
];

export const Permissions = [
  { label: 'View', name: 'view' },
  { label: 'Create', name: 'create' },
  { label: 'Edit', name: 'edit' },
  { label: 'Delete', name: 'delete' },
];
export const PermissionPages = {
  SUMMARY: 'Summary',
  DASHBOARD: 'Dashboard',
  USER_MANAGEMENT: 'User Management',
  ROLE: 'Role',
  SETTING: 'Setting',
  DYNAMIC_DATA: 'Dynamic Data',
  MASTER_DATA_LINE: 'Master Data Line',
  MASTER_DATA_MACHINE: 'Master Data Machine',
  MASTER_DATA_PARAMETER: 'Master Data Parameter',
};

export const PermissionPagesArray = Object.values(PermissionPages);
