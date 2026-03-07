export interface IRole {
  id: string;
  name: string;
  permissions: MenuRole[];
  created_at: string;
  updated_at: string;
}

export interface MenuRole {
  id: string;
  page: string;
  permission: string[];
}

export interface RoleForm {
  id: string;
  name: string;
  permissions: Record<string, Menu>;
}

export interface Menu {
  id: string;
  all: Permission;
  view: Permission;
  create: Permission;
  edit: Permission;
  delete: Permission;
}

export interface Permission {
  selected: boolean;
}
export interface RoleBody {
  id?: string;
  name: string;
  permissions: MenuRole[];
}
