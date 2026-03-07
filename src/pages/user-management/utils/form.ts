import { BASE_URL } from '@/core/constant/config.constant';
import { http, HttpResponse } from 'msw';
import { IBodyUser } from './model';

// Data statis untuk permission/menu
const staticMenus = {
  status: 200,
  message: 'Success',
  data: [
    { menu_name: 'dashboard' },
    { menu_name: 'user-management' },
    { menu_name: 'settings' },
    { menu_name: 'reports' },
    { menu_name: 'analytics' },
  ],
};

// Data statis untuk roles
const staticRoles = {
  status: 200,
  message: 'Success',
  data: [
    { id: 'admin', role: 'Administrator' },
    { id: 'manager', role: 'Project Manager' },
    { id: 'executor', role: 'Team Member' },
    { id: 'viewer', role: 'Viewer' },
  ],
};

const handlersUserManagement = [
  http.get(`${BASE_URL}/permission/get-all-permission`, async () => {
    return HttpResponse.json(staticMenus);
  }),

  http.get(`${BASE_URL}/role/get-all-role`, async () => {
    return HttpResponse.json(staticRoles);
  }),

  http.post(`${BASE_URL}/users`, async ({ request }: { request: Request }) => {
    const user: IBodyUser = await request.json();

    return HttpResponse.json({
      status: 200,
      message: 'User successfully added',
      data: user,
    });
  }),
];

export default handlersUserManagement;
