import { capitalize } from '@/core/utils/global-utils';
import { Menu, RoleBody, RoleForm } from './model';

export function mapRoleFormToBody(form: RoleForm): RoleBody {
  return {
    id: form.id,
    name: form.name,
    permissions: Object.entries(form.permissions)
      .map(([menuName, menu]) => ({
        id: menu.id,
        page: menuName,
        permission: Object.entries(menu)
          .filter(([_, perm]) => perm && perm.selected)
          .map(([permKey]) => capitalize(permKey)),
      }))
      .filter((menuRole) => menuRole.permission.length > 0),
  };
}

export function mapRoleBodyToForm(body: RoleBody): RoleForm {
  const permissions: Record<string, Menu> = {};

  body.permissions.forEach((menuRole) => {
    const menu: Menu = {
      id: menuRole.id,
      all: { selected: false },
      view: { selected: false },
      create: { selected: false },
      edit: { selected: false },
      delete: { selected: false },
    };

    menuRole.permission.forEach((perm) => {
      const temp = perm.toLowerCase();
      if (menu[temp as keyof Omit<Menu, 'id'>]) {
        menu[temp].selected = true;
      }
    });

    permissions[menuRole.page] = menu;
  });

  return {
    id: body.id ?? '',
    name: body.name,
    permissions,
  };
}
