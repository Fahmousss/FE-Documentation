export interface ITableUserManagement {
  id: string;
  username: string;
  password?: string;
  role: string;
  last_created: string;
  list_menu: IListMenu[];
}
export interface ICreateUserManagementBody {
  child: IListMenu[];
  password: string;
  role: string;
  username: string;
}

export interface IListMenu {
  menu_name: string;
  permissions: string[];
}

export interface IBodyUser {
  id?: string;
  password?: string;
  username: string;
  role: string;
  list_menu: IListMenu[];
}
